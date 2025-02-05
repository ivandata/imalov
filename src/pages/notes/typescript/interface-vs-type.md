---
title: "The main differences between interface and type in typescript"
description: "The main differences between interface and type in typescript"
keywords: "typescript, interface, type"
lang: "typescript"
date: 2022-11-10
---

A very common question in technical interviews is: «whats the main differences between interface and type in typescript?»

Almost all features of an interface are available in type, the key distinction is that a type cannot be re-opened to add new properties vs an interface which is always extendable.
```typescript
// Extending an interface
interface Animal {
  name: string
}

interface Bear extends Animal {
  honey: boolean
}

// Extending a type via intersections
type Animal = {
  name: string
}

type Bear = Animal & {
  honey: boolean
}
```

Type aliases may not participate in declaration merging, but interfaces can.
```typescript
interface Mammal {
    genus: string
}
// An interface can be re-opened and new values added:
interface Mammal {
    breed?: string
}

type Reptile = {
    genus: string
}

// You cannot add new variables in the same way
// Error: Duplicate identifier 'Reptile'.
type Reptile = {
    breed?: string
}
```

Interfaces may only be used to declare the shapes of objects, not rename primitives.
```typescript
// Using type we can create custom names
// for existing primitives:
type SanitizedString = string
type EvenNumber = number

// This isn't feasible with interfaces
interface X extends string {

}
```

Interface names will always appear in their original form in error messages, but only when they are used by name.
```typescript
interface Pizza {
    name: string
}

function echoPizza(m: Pizza) {
    console.log(m.name)
}

// e.g. The error below will always use the name Pizza 
// to refer to the type which is expected:
echoPizza({ name: 12343 })

// The type of `m` here is the exact same as Pizza,
// but as it's not been directly named, TypeScript
// won't mention it in the error messaging
function echoAnimal(m: { name: string }) {
    console.log(m.name)
}

echoAnimal({ name: 12345 })
```

For the most part, you can choose based on personal preference, and TypeScript will tell you if it needs something to be the other kind of declaration. 
If you would like a heuristic, use interface until you need to use features from type.
