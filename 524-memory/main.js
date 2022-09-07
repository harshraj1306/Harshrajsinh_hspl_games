// Define the card child component
// https://oatw.github.io/luda/0.3.x/advanced/component#define-component-classes
luda.component('card')
// Define self maintained css classes as private properties.
// https://oatw.github.io/luda/0.3.x/advanced/component#private-property
.protect('cls', {
  active: 'active', 
  hidden: 'hidden'
})
// Define image src passed in from parent component as a public property.
// https://oatw.github.io/luda/0.3.x/advanced/component#public-property
.include('src', function(){
  // Get the value of data-src of this component's root element.
  // https://oatw.github.io/luda/0.3.x/advanced/api#root
  // https://oatw.github.io/luda/0.3.x/advanced/api#data-name-value
  return this.root.data('src')
})  
// Define a private method of this component.
// https://oatw.github.io/luda/0.3.x/advanced/component#private-property
.protect('insertImage', function(){
  // Set the innerHTML of this component's root element.
  // https://oatw.github.io/luda/0.3.x/advanced/api#html-html
  this.root.html(`<img src="${this.src()}"/>`)
})
// Define public methods of this component.
// https://oatw.github.io/luda/0.3.x/advanced/component#public-property
.include({
  isHidden(){
    // Check if the component's root element has the .hidden class.
    // https://oatw.github.io/luda/0.3.x/advanced/api#hasclass-name
    return this.root.hasClass(this.cls.hidden)
  },
  transitionDuration(){
    // Get the transition duration in milliseconds.
    // https://oatw.github.io/luda/0.3.x/advanced/api#transitionduration-
    return this.img.transitionDuration()
  },
  activate(){
    // Add the .active class to this component's root element.
    // https://oatw.github.io/luda/0.3.x/advanced/api#addclass-name
    this.root.addClass(this.cls.active)
  },
  deactivate(){
    // Remove the .active class from this component's root element.
    // https://oatw.github.io/luda/0.3.x/advanced/api#removeclass-name
    this.root.removeClass(this.cls.active)
  },
  hide(){
    this.root.addClass(this.cls.hidden)
  },
  show(){
    this.root.removeClass(this.cls.hidden)
  }
})
// Define component helpers.
// https://oatw.github.io/luda/0.3.x/advanced/component#define-component-helpers
.help({
  // The find helper for accessing dom elements.
  // https://oatw.github.io/luda/0.3.x/advanced/component#the-find-helper
  find(){
    return {img: 'img'}
  },
  // Executes on component creating.
  // https://oatw.github.io/luda/0.3.x/advanced/component#the-create-helper
  create(){
    this.deactivate()
    this.show()
    this.insertImage()
  }
})



// Define the timeline child component.
luda.component('timeline')
// Datas passed in from parent component.
.include({
  totalSeconds(){
    return this.root.data('total') || 0
  },
  secondsRemaining(){
    return this.root.data('remaining') || 0
  }
})
// Define private methods.
.protect({
  updateLine(){
    let distance = (this.secondsRemaining() / this.totalSeconds()) || 1
    // https://oatw.github.io/luda/0.3.x/advanced/api#css-property-value
    this.line.css('transform', `translate3d(-${distance * 100}%, 0, 0)`)
  }
})
// Define component helpers.
.help({
  find(){
    return {line: 'div'}
  },
  create(){
    this.root.html('<div></div>')
  },
  // The watch helper for watching dom tree mutations.
  // https://oatw.github.io/luda/0.3.x/advanced/component#the-watch-helper
  watch(){
    return {
      node: [['div', this.updateLine]],
      attr: [['data-total, data-remaining', this.updateLine]]
    }
  }
})



// Define the parent component.
luda.component('memoryCardGame')
// Self maintained properties.
.protect({
  secondsRemaining: 0,
  hiddenCardCounts: 0,
  pendingCard: null,
  timer: null,
  started: false,
  isDissmissing: false
})
// Properties passed in from outside.
.include({
  imageSource(){
    return this.root.data('images') || []
  },
  // Ensure the count number is even.
  cardCounts(){
    if(counts = this.root.data('counts')){
      return Math.floor(counts / 2) * 2
    }else{
      return 16
    }
  },
  roundSeconds(){
    return this.root.data('round-seconds') || 5 * 60
  }
})
// Define component public methods in an object.
.include({
  start(){
    if(!this.started){
      this.started = true
      this.checkTimeout()
    }
  },
  reset(){
    clearTimeout(this.timer)
    this.started = false
    this.secondsRemaining = this.roundSeconds()
    this.pendingCard = null
    this.hiddenCardCounts = 0
    this.isDismissing = false
    this.insertChildren()
  }
})
// Define component private methods in an object.
.protect({
  isSucceed(){
    return this.hiddenCardCounts >= this.cardCounts()
  },
  checkTimeout(){
    this.timer = setTimeout(() => {
      this.timeline.data('remaining', this.secondsRemaining -= 1)
      if(this.secondsRemaining > 0){
        this.checkTimeout()
      }else{
        if(!this.isSucceed()){
          this.reset()
          // Dispatch a event from this component.
          // https://oatw.github.io/luda/0.3.x/advanced/api#trigger-name-data-callback
          this.root.trigger('memoryCardGame:finished', {succeed: false})
        }
      }
    }, 1000)
  },
  // Child component instances will be automatically created
  // when matched elements inserted to document.
  insertChildren(){
    let tpl = `
      <div class="timeline"
        data-total="${this.roundSeconds()}"
        data-remaining="${this.secondsRemaining}">
      </div>
    `
    tpl += this.shuffleImageSource().map(function(src){
      return `<div class="card" data-src="${src}"></div>`
    }).join('')
    this.root.html(tpl)
  },
  shuffleImageSource(){
    let source = this.imageSource()
    if(source.length){
      let halfCounts = this.cardCounts() / 2
      while(source.length < halfCounts){
        source = source.concat(source)
      }
      source = source.splice(0, halfCounts)
      source = source.concat(source)
      let picked, randomIndex
      let pickedIndex = source.length
      while(pickedIndex){
        pickedIndex -= 1
        randomIndex = Math.floor(Math.random() * pickedIndex)
        picked = source[pickedIndex]
        source[pickedIndex] = source[randomIndex]
        source[randomIndex] = picked
      }
    }
    return source
  },
  compareCards(event){
    if(!this.started || this.isDismissing) { return }
    let current = event.currentTarget
    let pending = this.pendingCard
    // Use component proxy to pick component instances.
    // https://oatw.github.io/luda/0.3.x/advanced/component#named-component
    let currentCard = luda.card(current)
    // Use chain: false to break the chain api
    // https://oatw.github.io/luda/0.3.x/advanced/component#other-things
    let currentIsHidden = currentCard.isHidden({chain: false})[0]
    if(current === pending || currentIsHidden){ return }
    currentCard.activate()
    if(!pending){ return this.pendingCard = current }
    let bothCards = luda.card([current, pending])
    let bothSrcs = bothCards.src({chain: false})
    this.pendingCard = null
    if(bothSrcs[0] === bothSrcs[1]){
      this.hiddenCardCounts += 2
      bothCards.hide()
      if(this.isSucceed()){
        this.reset()
        this.root.trigger('memoryCardGame:finished', {succeed: true})
      }
    }else{
      this.isDismissing = true
      setTimeout(() => {
        this.isDismissing = false
        bothCards.deactivate()
      }, currentCard.transitionDuration({chain: false})[0])
    }
  }
})
// Define component helpers.
.help({
  find(){
    return {timeline: '.timeline'}
  },
  create(){
    this.reset()
  },
  // Listen component events.
  // https://oatw.github.io/luda/0.3.x/advanced/component#the-listen-helper
  listen(){
    return [['click', '.card', this.compareCards]]
  },
  watch(){
    return {attr: [
        ['data-images', this.reset],
        ['data-counts', this.reset],
        ['data-round-seconds', this.reset]
    ]}
  }
})



// Executes when document ready.
// https://oatw.github.io/luda/0.3.x/advanced/api#ready-callback
luda.ready(function(){
  // Set textContent of an element.
  // https://oatw.github.io/luda/0.3.x/advanced/api#text-
  luda('#round-seconds').text(luda('#game').data('round-seconds'))
  // Set the value of a form element.
  // https://oatw.github.io/luda/0.3.x/advanced/api#val-value
  luda('#game-level').val(luda('#game').data('counts'))
  // Add event listeners.
  // https://oatw.github.io/luda/0.3.x/advanced/api#on-name-selector-callback
  luda(document)
  .on('click', '#start', function(){
    luda.memoryCardGame('#game').start()
  })
  .on('change', '#game-level', function(event, imageCounts){
    luda('#game').data('counts', luda(this).val())
  })
  .on('memoryCardGame:finished', '#game', function(event, result){
    luda('#pannel').data('succeed', result.succeed)
    luda.toggle('#pannel').activate()
  })
})