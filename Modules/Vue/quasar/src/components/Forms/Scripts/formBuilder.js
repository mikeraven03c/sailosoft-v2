import TextComponent from "src/components/Forms/Components/TextComponent.vue";
import EditorComponent from "src/components/Forms/Components/EditorComponent.vue";
import MoneyComponent from "src/components/Forms/Components/MoneyComponent.vue";
import NumberComponent from "src/components/Forms/Components/NumberComponent.vue";
import SelectComponent from "src/components/Forms/Components/SelectComponent.vue";

const TEXT = 'text';
const EDITOR = 'editor';
const MONEY = 'money';
const NUMBER = 'number';
const SELECT = 'select';
const COLOR = 'color';

export const formType = {
  text: TEXT
}

export function updateBuilderFormData(formData) {
  return {
    update(field, event) {
      formData.value[field] = event
    }
  }
}

function formBuilderInput({
  type,
  field,
  property = {}
}) {
  const formInput = {
    value: {
      type,
      field,
      property: {
        ...property,
        // label: label ? label : convertToTitleCase(field),
        label: property.label ? property.label : titleCase(field),
        className: ''
      },
    },

    setLabel: (newLabel) => {
      formInput.value.property.label = newLabel;
      return formInput;
    },
    set: (property, value) => formInput.setProperty(property, value),
    setProperty(property, value) {
      formInput.value.property[property] = value
      return formInput;
    },
    setClassName: (className) => {
      formInput.value.property.className = className
      return formInput
    },
    setColSize: (size) => formInput.setColumnSize(size),
    setColumnSize: (size) => {
      switch (size) {
        case 1:
          formInput.setClassName('col-12')
          break;
        case 2:
          formInput.setClassName('col-6')
          break;
      }

      return formInput
    },

    get: () => {
      return formInput.value;
    },
  };

  return formInput;
}

export function formInput(type, field, property = {}) {
  return formBuilderInput({
    type,
    field,
    property
  })
}

export function textFormInput(field, property = {}) {
  const {
    label
  } = property

  const input = formBuilderInput({
    type: TEXT,
    field: field,
  })

  return input;
}

export function editorFormInput(field) {
  return formBuilderInput({
    type: EDITOR,
    field: field
  })
}

export function moneyFormInput(field) {
  return formBuilderInput({
    type: MONEY,
    field: field
  })
}

export function numberFormInput(field) {
  return formBuilderInput({
    type: NUMBER,
    field: field
  })
}

export function colorPickerFormInput(field) {
  return formBuilderInput({
    type: COLOR,
    field: field
  })
}

export function selectFormInput(field) {
  const input = formBuilderInput({
    type: SELECT,
    field: field
  })

  input.options = (options) => {
    input.setProperty('options', options)
    return input;
  }

  input.emitOption = (value = false) => {
    input.setProperty('emitOption', value)
    return input;
  }

  input.useChip = () => {
    input.setProperty('use-chips', true)
    return input;
  }

  input.multiple = () => {
    input.setProperty('multiple', true)
    return input;
  }

  return input;
}

// Recode
function convertToTitleCase(text) {
  const words = text.split('_').join(' ').split(' ');
  const titleCaseWords = words.map(word => {
    const firstLetter = word.charAt(0).toUpperCase();
    const restOfWord = word.slice(1).toLowerCase();
    return firstLetter + restOfWord;
  });

  // Join the words back together with spaces
  const titleCaseText = titleCaseWords.join(' ');

  return titleCaseText;
}

const titleCase = (s) =>
  s.replace(/^_*(.)|_+(.)/g, (s, c, d) => c ? c.toUpperCase() : ' ' + d.toUpperCase())