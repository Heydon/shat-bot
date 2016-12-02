<template>
  <div>
    <shat-title></shat-title>
    <shat-chat></shat-chat>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        entered: false
      }
    }
  }
</script>
<style>
* {
  margin: 0;
  color: inherit;
  font-family: inherit;
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
  font-size: calc(1em + 1vw);
  line-height: 1.5;
}

h1 {
  height: 10vh;
  line-height: 10vh;
  text-align: center;
}

h1, form {
  background: #ddd;
}

.chat {
  list-style: none;
  margin: 0;
  padding: 0.5em;
  height: 75vh;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  z-index: 1;
}

.chat li + li {
  clear: both;
}

.chat li + li {
  padding-top: 0.5em;
}

.chat li:last-child {
  padding-bottom: 0.5em;
}

.chat div {
  padding: 1.5em;
  border: 0.25em solid;
  border-radius: 0.25em;
  width: 60%;
}

.chat .User {
  float: right;
}

.chat .Status {
  width: 100%;
  text-align: center;
  background: #fcc;
}

form {
  height: 15vh;
  line-height: 15vh;
  text-align: center;
}

form * {
  vertical-align: middle;
}

label {
  font-weight: bold;
}

input, button {
  border: 0.25em solid black;
  padding: 0.25em;
  font-size: inherit;
}

input {
  width: 8em;
}

button {
  background: black;
  color: white;
}

input:focus, button:focus {
  outline: 2px solid #3771c8;
}

a {
  color: #3771c8;
}

/* animations */

@keyframes opacitize {
  0%   { transform: scale(1); }
  50% { transform: scale(1.125); }
  100% { transform: scale(1); }
}

.chat div {
  animation: opacitize 0.25s linear 1;
}
</style>
