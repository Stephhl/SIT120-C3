<script setup>
import { ref, watch, computed } from 'vue';

import PropComponent from '@/components/PropComponent.vue'
import EmitComponent from '@/components/EmitComponent.vue'
import SlotComponent from '@/components/SlotComponent.vue'


const msg = 'This is the message';
const dynID = 'Dynamic ID';
const jValue = 2;
const rawHtml = '<span style="color: red">Raw HTML</span>';
const count = ref(0);

const isActive = true;
const textColor = 'blue';

const doubledCount = computed(() => count.value * 2);

const propMSG = "Hello this is a prop message";
const childMSG = "Waiting fait for child response";
const slotMSG = "This is for slots";


const keyObject = ref([{1: 'one' }, {2: 'two' }])
const items = [{ id: 1, text: 'Item 1', isVisible: true }, { id: 2, text: 'Item 2', isVisible: true } ];


const textInput = '';
const isChecked = false;
const selectedOption = '';
const selectedState = 'Melbourne';
const textArea = '';


const lazyInput = '';
const numericInput = '';
const trimmedInput = '';


function showMessage()
{
  alert('Hello');
}

function increment() {
  count.value++;
}


function popUp(event) {
  if (event) {
    alert("You clicked on the pop up!");
  }
}

const question = ref('')
const answer = ref('Questions usually contain a question mark.')


watch(question, async (newQuestion, oldQuestion) => {
  if (newQuestion.indexOf('?') > -1) {
    answer.value = 'Thinking...'
    try {
      const res = await fetch('https://yesno.wtf/api')
      answer.value = (await res.json()).answer
    } catch (error) {
      answer.value = 'Error! Could not reach the API. ' + error
    }
  }
})
</script>

<template>
  <div>
    <!-- 1. Template Syntax -->
    <h3>1. Template Syntax</h3>

    <!-- a. Text Interpolation -->
    <p>1a.Text Interpolation</p>
    <span>Message: {{ msg }}</span>

    <!-- b. Raw HTML [v-html] -->
    <p>1b.Raw HTML [v-html]</p>
    <p>Using text interpolation: {{ rawHtml }}</p>
    <p>Using v-html directive: <span v-html="rawHtml"></span></p>

    <!-- c. Attribute Bindings [v-bind:id] -->
    <p>1c.Attribute Bindings</p>
    <p>Attribute Binding:</p>
    <div :id="dynID"></div>

    <!-- d. JavaScript expressions inside syntax i.e.{{ }} -->
    <p>1d. JavaScript expressions inside syntax</p>
    <p>{{ jValue + 2 }} - jValue(2) + 2</p>



    <!-- 2. Methods -->
    <p>2. Methods</p>
    <button v-on:click='showMessage()'>Click me to show a message!</button>



    <!-- 3. Reactivity Fundamentals [ref(), <script setup>] -->
    <!-- Using ref() -->
    <p>3. Reactivity Fundamentals</p>
    <button @click="increment()">
    Number: {{ count }}
    </button>



    <!-- 4. Computed Properties -->
    <p>4. Computed Properties</p>
    <p>Count: {{ count }}</p>
    <p>Doubled Count: {{ doubledCount }}</p>



    <!-- 5. Class and Style Bindings -->
    <!-- a. Binding HTML class [v-bind:class] -->
    <p>5a. Binding HTML class</p>
    <p v-bind:class="{'active': isActive}">Active</p>

    <!-- b. Binding Inline Styles [v-bind:style] -->
    <p>5b. Binding Inline Styles</p>
    <p :style="{ color: textColor }">Text Style</p>



    <!-- 6. List Rendering -->
    <!-- a. v-for with an Object -->
    <p>6a. v-for with an Object</p>
    <ul>
      <li v-for="(value, key) in keyObject" :key="key">{{ key }}: {{ value }}</li>
    </ul>

    <!-- b. v-for with a Range -->
    <p>6b. v-for with a Range</p>
    <ul>
      <li v-for="n in 5" :key="n">{{ n }}</li>
    </ul>

    <!-- c. v-for on <template> -->
    <p>6c. v-for on template</p>
    <ul>
      <template v-for="item in items" :key="item.id" >
      <li >{{ item.text }}</li>
      </template>
    </ul>


    <!-- d. v-for with v-if -->
    <p>6d. v-for with v-if (show if item is isVisible == true)</p>
    <ul>
      <li v-for="item in items" :key="item.id">
      <p v-if="item.isVisible">{{ item.text }}</p>
      </li>
    </ul>

    <!-- e. v-for with a Component -->
    <p>6e. v-for with a Component</p>
    <ul>
      <VForComponent v-for="item in items" :key="item.id" :item="item"></VForComponent>
    </ul>



    <!-- 7. Event Handling: Listening to Events [v-on:click] -->
    <!-- a. Inline Handlers -->
    <p>7a. Event Handling: Inline Handler</p>
    <button @click="count++">Click to add +1</button><br>
    <p>{{ count }}</p>

    <!-- b. Method Handlers -->
    <p>7b. Event Handling: Method Handlers</p>
    <button @click="popUp">Click for a popup!</button>



    <!-- 8. Form Input Bindings -->
    <!-- a. v-model with various input types -->
    <p>8a. v-model with various input types</p>
    <input type="text" v-model="textInput" /><br>
    <input type="checkbox" v-model="isChecked" /> Checkbox<br>
    <input type="radio" id="one" value="One" v-model="selectedOption" name="chooseRadio">
    <label for="one">One</label>
    <br>
    <input type="radio" id="two" value="Two" v-model="selectedOption" name="chooseRadio">
    <label for="two">Two</label>
    <br>
    <select v-model="selectedState">
      <option value="option1">Melbourne</option>
      <option value="option2">Sydney</option>
    </select><br>
    <textarea v-model="textArea" placeholder="Input text in this text box area"></textarea>
    <p>-------------------------------------------------------------------------------</p>

    <!-- b. v-model modifiers [.lazy, .number, .trim] -->
    <p>8b. v-model modifiers</p>
    <input type="text" v-model.lazy="lazyInput" />
    <input type="text" v-model.number="numericInput" />
    <input type="text" v-model.trim="trimmedInput" />



    <!-- 9. Watchers -->
    <p> Ask a yes/no question:<input v-model="question" /></p>
    <p>{{ answer }}</p>
    


    <!-- 10. Components -->
    <!-- a. Props -->
    <p>10a. Props</p>
    <PropComponent :propMessage="propMSG"/>

    <!-- b. Events [$emit] -->
    <p>10b. Events/Emit</p>
    <EmitComponent @response="(msg) => childMSG = msg"/>

    <!-- c. Slots -->
    <p>10c. Slots</p>
    <SlotComponent>{{ slotMSG }}</SlotComponent>



    <!-- 11. Router -->
    <p>11. Router</p>
      <nav>
        <RouterLink to="/">Home</RouterLink><br>
        <RouterLink to="/SecondPage">SecondPage</RouterLink>
      </nav>


  </div>
</template>

<style scoped>
/*
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
*/
</style>
