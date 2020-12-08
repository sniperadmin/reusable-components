<style>
html {
  scroll-behavior: smooth;
}
</style>

### for direct use:
  you can use one of the inputs like this:

```vue
<template>
  <b-container>
    <AtlasInput v-model="textVal" text label="text input" />
    <AtlasInput v-model="selectVal" select :select-options="opts" label="select input" />
    <AtlasInput v-model="date" datepicker label="date" :rules="{required:true}" />
    <AtlasInput v-model="file" file label="file input" />
    <AtlasInput v-model="filePlain" file plain label="plain file input" />
  </b-container>
</template>
<script>
export default {
  data () {
    return {
      textVal: null,
      selectVal: null,
      file: null,
      filePlain: null,
      date: null,
      opts: ['1', '2', '3', '4', '5']
    }
  }
}
</script>
```
---

#### you can use different sizes:
just add on of these attributes: `small`, `medium`, `large`

```vue
<template>
  <b-container>
    <AtlasInput v-model="textVal" small text label="small text input" />
    <AtlasInput v-model="textVal" medium text label="medium text input" />
    <AtlasInput v-model="textVal" large text label="large text input" />
  </b-container>
</template>
<script>
  export default {
    data () {
      return {
        textVal: null
      }
    }
  }
</script>
```
---

### select input
You can specify the value and text fields easily
by using ```value-field``` && ```text-field```.
Both values accept `string`
```vue
<template>
  <AtlasInput
    v-model="selected"
    rules="required:true"
    select
    :select-options="opts"
    value-field="id"
    text-field="displayText"
    label="select"
  />
</template>
<script>
export default {
  data () {
    return {
      selected: null,
      opts: [
        { id: '1', displayText: 'test' },
        { id: '2', displayText: 'test2' }
      ]
    }
  }
}
</script>

```
---

### Date picker
with our datepicker, you can use the normal date in the `v-model` which is in `YYY-MM-DD` format.
If you like to have the `MM-DD-YYYY` format, you can use the `@formatted-date` event which sends the
processed date...

<b class="text-danger mb-3">
Note: this will work on your nuxt app only, documentation is not supporting `@nuxt/moment` module
</b>

```vue
<template>
  <b-container>
    <AtlasInput v-model="date" rules="required" datepicker label="choose date" @formatted-date="processIt" />

    <b-container class="border">
      <h2>Using with form</h2>
      <AtlasValidationForm @form-submit="handleSubmit">
        <AtlasInput v-model="date" rules="required" datepicker label="choose date" @formatted-date="processIt" />
      </AtlasValidationForm>
    </b-container>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
      date: null,
      formattedDate: ''
    }
  },
  methods: {
    processIt(x) {
      // should handle the output
    },
    handleSubmit() {
      alert('tadaaaa!')
    }
  }
}
</script>
```

### validations
You can setup validations really easy:

```vue
<template>
  <b-container>
    <AtlasInput v-model="name" :rules="{required: true}" text label="Name" />
  </b-container>
</template>
<script>
export default {
  data () {
    return {
      name: null,
    }
  }
}
</script>
```
---

### available validations

#### alpha

```vue
<template>
  <AtlasInput v-model="name" rules="alpha: true" text label="Name" />
</template>
<script>
export default {
  data () {
    return {
      name: null,
    }
  }
}
</script>
```

#### alpha_dash

```vue
<template>
  <AtlasInput v-model="name" rules="alpha_dash: true" text label="Name" />
</template>
<script>
export default {
  data () {
    return {
      name: null,
    }
  }
}
</script>
```

#### alpha_num

```vue
<template>
  <AtlasInput v-model="name" rules="alpha_num: true" text label="Name" />
</template>
<script>
export default {
  data () {
    return {
      name: null,
    }
  }
}
</script>
```
#### alpha_spaces

```vue
<template>
  <AtlasInput v-model="name" rules="alpha_spaces: true" text label="Name" />
</template>
<script>
export default {
  data () {
    return {
      name: null,
    }
  }
}
</script>
```

#### between

```vue
<template>
  <AtlasInput v-model="name" rules="between: true" text label="Name" />
</template>
<script>
export default {
  data () {
    return {
      name: null,
    }
  }
}
</script>
```

####  digits

```vue
<template>
  <AtlasValidationForm>
    <AtlasInput v-model="name" rules="digits: 3" text label="Name" />
  </AtlasValidationForm>
</template>
<script>
export default {
  data () {
    return {
      name: null,
    }
  }
}
</script>
```

#### dimensions

```vue
<template>
  <AtlasValidationForm>
    <AtlasInput v-model="fileObj" rules="dimensions:120,120" file label="pic" />
  </AtlasValidationForm>
</template>
<script>
export default {
  data () {
    return {
      fileObj: null,
    }
  }
}
</script>
```

####  confirmed

```vue
<template>
  <AtlasValidationForm>
    <AtlasInput v-model="confirmation" confirmation text label="pass to be confirmed" />
    <AtlasInput v-model="val" rules="confirmed:confirmation" text label="repeat pass" />
  </AtlasValidationForm>
</template>
<script>
export default {
  data () {
    return {
      val: null,
      confirmation: '123'
    }
  }
}
</script>
```

#### email

```vue
<template>
  <AtlasValidationForm>
    <AtlasInput v-model="val" rules="email" text label="Name" />
  </AtlasValidationForm>
</template>
<script>
export default {
  data () {
    return {
      val: null,
    }
  }
}
</script>
```
#### image

```vue
<template>
  <AtlasValidationForm>
    <AtlasInput v-model="val" rules="image" file label="pic" />
  </AtlasValidationForm>
</template>
<script>
export default {
  data () {
    return {
      val: null,
    }
  }
}
</script>
```

#### max

```vue
<template>
  <AtlasValidationForm>
    <AtlasInput v-model="val" rules="max:4" text label="Name" />
  </AtlasValidationForm>
</template>
<script>
export default {
  data () {
    return {
      val: null,
    }
  }
}
</script>
```

#### min

```vue
<template>
  <AtlasValidationForm>
    <AtlasInput v-model="val" rules="min:4" text label="Name" />
  </AtlasValidationForm>
</template>
<script>
export default {
  data () {
    return {
      val: null,
    }
  }
}
</script>
```

#### numeric

```vue
<template>
  <AtlasValidationForm>
    <AtlasInput v-model="val" rules="numeric" text label="Name" />
  </AtlasValidationForm>
</template>
<script>
export default {
  data () {
    return {
      val: null,
    }
  }
}
</script>
```
---