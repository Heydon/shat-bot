<template>
  <div>
    <div v-if="messages">
      <ul class="chat" id="chat" aria-live="assertive">
        <li v-for="message in messages">
          <div :class="message.writer">
            <strong>{{ message.writer }}:</strong>
            {{ message.message }}
          </div>
        </li>
      </ul>
    </div>
    <form>
      <label>
        You:
        <input id="message" autofocus />
      </label>
      <button type="submit" @click="pushUserMessage">Send</button>
    </form>
  </div>
</template>

<script>
  export default {
    data: function() {
      return {
        messages: [],
        waiting: null,
        responseType: 'generic',
        withoutInterruptions: 1,
        severity: 0,
        botMessages: {
          severity1: [
            'I think I had too much lunch.',
            'When we\'re done here, I\'m going to do the biggest shit.',
            'I kind of need the toilet, I think.',
            'Not sure I should have eaten that whole chicken.',
            'I\'ve got a break in a few minutes. Looking forward to doing a poo.'
          ],
          severity2: [
            'I really do need to use the toilet.',
            'Let\'s get this sorted quickly. I need to use the bathroom.',
            'I need to take a bathroom break ASAP. So I\'m going to work as fast as I can.',
            'I\'ll help you, then I need to go offline to take a shit.',
          ],
          severity3: [
            'I\'m clenching here.',
            'Urgh, my guts are fucked.',
            'Gotta go potty pretty bad now.',
            'Seriously though. Gotta shit.',
            'Boy, this shit really wants out.',
            'I\'m scared I\'m going to soil myself.'
          ],
          severity4: [
            'Oh no, I think it\'s starting to come out.',
            'Not sure how long I can hold back. I\'ve got a sweat on.',
            'Uh oh, I\'m breaching.',
            'Oh no oh no oh no',
            'I\'m getting the dolphin\'s nose here.',
            'Oh God. I don\'t think I\'m going to make it to the toilet.'
          ],
          severity5: [
            'Fuckfuckfuck I\'ve shat myself.',
            'For fuck\'s sake. You\'ve made me shit my keks.',
            'Oh God. I\'ve shat my pants. I\'m sitting in shit.',
            'Great. There\'s shit everywhere. I hope you\'re happy.'
          ],
          question: [
            'Let me find an answer for that.',
            'I\'m sure there\'s an answer. I\'ll find out.',
            'Good question. Let me see. Please wait.',
            'I don\'t know how to answer that right now. Researching...'
          ],
          pooTalk: [
            'This is not a good time to talk to me about poop, tbqh.',
            'I wish you wouldn\'t use that word.',
            'Why would you bring that up?',
            "Can we not mention poo, please?"
          ],
          generic: [
            'Let me research that for you.',
            'I will try to assist. Please hold on...',
            'Interesting. I\'ll see if I can help.',
            'Processing your request. Back shortly.'
          ]
        },
        pooWords: [
          'poo',
          'shit',
          'dump',
          'crap',
          'squit',
          'diarrhea',
          'log'
        ]
      }
    },
    methods: {
      delay () {
        var delay = Math.floor(Math.random() * (20000 - 8000 + 1) + 8000);
        console.log('delay:', delay);
        return delay;
      },
      scrollDown () {
        window.setTimeout(function() {
          var chatbox = document.getElementById('chat');
          chatbox.scrollTop = chatbox.scrollHeight;
        }, 20);
      },
      pushMessage(writer, message) {
        this.messages.push({
          writer: writer,
          message: message
        });
      },
      cueBotMessage() {
        var parent = this;

        if (parent.withoutInterruptions !== 0) {
          parent.severity += 1;
        }

        this.waiting = window.setTimeout(function() {
          var severityProp = 'severity' + parent.severity;
          var messageArray = parent.botMessages[severityProp] || false;
          console.log('severity:', parent.severity);
          if (messageArray.length) {
            var message = messageArray[Math.floor(Math.random()*messageArray.length)];
            console.log('Message:', message);
            if (parent.withoutInterruptions === 0) {
              var prefixArray = parent.botMessages[parent.responseType];
              console.log('prefixArray:', prefixArray);
              message = prefixArray[Math.floor(Math.random()*prefixArray.length)] + ' ' + message;
            }

            parent.pushMessage('Bot', message);
          }

          parent.withoutInterruptions += 1;

          if (parent.severity >= 6) {
            parent.pushMessage('Status', 'Shatbot has left the chatroom.');
            parent.scrollDown();
          } else {
            parent.cueBotMessage();
          }

          parent.scrollDown();

        },
        this.delay());

      },
      pushUserMessage(e) {
        e.preventDefault();
        var input = document.getElementById('message');
        var newMessage = input.value;

        if (newMessage) {

          if (newMessage.substr(newMessage.length - 1) == '?') {
            this.responseType = 'question';
          } else if (this.pooWords.some(function(i) { return newMessage.toLowerCase() == i; })) {
            this.responseType = 'pooTalk';
          } else {
            this.responseType = 'generic';
          }

          console.log('responseType: ', this.responseType);

          this.pushMessage('User', newMessage);
          this.scrollDown();
          input.value = '';
          window.clearTimeout(this.waiting);
          this.withoutInterruptions = 0;
          this.cueBotMessage();

        }
      }
    },
    mounted() {
      var parent = this;
      window.setTimeout(function() {
        parent.pushMessage('Bot', 'Hi there! How may I help you today?');
        parent.cueBotMessage();
      }, 1000);
    }
  }
</script>
