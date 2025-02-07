---
layout: ../../layouts/article.astro
title: "Efficient React Development: The Power of Modular Organization"
description: "A modular approach to the organization of React applications."
keywords: "React applications, Modular approach, Code maintainability, Scalability, Collaboration, Component-based architecture, Development teams, Troubleshooting, Feature updates, Streamlining, Web development, Robustness, Flexibility, Sustainability"
date: 2023-06-15
---

> Good code is like a love letter to the next developer who will maintain it. </br>
— [Addy Osmani](https://addyosmani.com/blog/good-code/)

When you look at an application structure it should tell you a story. The design of an application should be able to tell what this application is about, what the domain is, what it's doing.
React doesn’t have opinions on how you put files into folders. React is flexible library, but flexibility, though, makes it difficult to structure a React project since there are no standards set by React.

## Classic approach
Any non-trivial application will end up with just a large giant file with containers or pages and components with no particular organization about them. Let's take a look at the classic react app structure.

```
- app
  - components
  - hooks
  - types
  - layouts
  - pages
```

This works fine for a small application. It contains clear hierarchy, folder names and has no any dependencies at the first look. But if then your app growing, growing dependencies too with relationships between folders. This is just not productive to work with. If you need to move something, very likely you will touch many files too. Any relationship not clear between business logic, components, hooks. The probability of circular dependencies increases. Code review turns into a complex logical puzzle.

## Modular approach
This approach suggest to group applications by modules where each module is like represents a specific part of the application. Usually this can be based on the top level routes or pages inside of the app. If you need more control or if you have some screen or some part of your applications that has a lot of complex functionality in you can continue to split that further and in this way every module will only hold the functionality which is relevant to it, so you will have one module that with will deal with it. Let's take a look at the app structure:

```
- app
  - common
    - components
    - hooks
    - types
    - layouts
  - modules
    - module-one
      - components
      - hooks
      - types
      - layouts
    - module-two
      - components
      - hooks
      - types
      - layouts
  - pages
    - page-one
    - page-two
```

Let's say you have a dashboard page. Following this structure, dashboard module would contain everything related to the dashboard page, including all the components, hooks and types and functionality. The dashboard could include shared components and dependencies but only from common folder.

### Common folder
Contain shared parts of application. Follow classic React structure including components, hooks and all necessary files. This is the only place that allows you to store and distribute parts of the application between modules.

### Modules folder 
Each module folder follow classic folder structure in react, it is a pretty common and follow the structure that was explained before. All parts from the module should be used only inside module and the same name page. One module in application shouldn't reference to another module. **This is important rule!** This allow us make any refactoring, changes, code review much simple. Otherwise your going to end up with a very complicated web of **circular dependencies**. It helps to make changes and not affect other modules and not broke them.

### Pages folder
If modules based on the top level pages inside of the app this folder should contain on the top level of folder pages with modules names. Inside pages can splited to the sub routes and slugs, but all the parts inside are the property of this module and should not include parts from other modules. The exception is the common folder.

### Utils folder
The utils folder usually becomes like a catch-all bucket for everything that people don't know where to place. I'm not a big fan of this folder. In my mind if you have this folder it means you have some problems in your files organisation. But if you have it, it should be like a toolbox and should keep functionality which is very application agnostic. It means you can pick this folder and move it to another application and it would work properly. For example it shouldn't include types, or business logic. Maybe it can contains some field validation, like regex, or util function like filtering collection, values extraction.

### Other folders
Obviously, other folders, such as API calls, may be located in the root of the application. But these exceptions should be treated separately and should not violate the principle of module isolation. To check whether your module is isolated or not, it is enough to delete it and the same-named folder with routes. If the result will be a working application that does not require serious interventions from the developer, then your module is isolated correctly.  
  
## Benefits
While for small applications this approach may seem unnecessary, for a company of more than 3 developers with an actively growing codebase it can bring many very useful benefits over classical React application structure.

#### Onboarding 
Let say a new developer join to your team, and they open the project, see the structure and immediately know that folder responsible for. It's just much easier to navigate in that regard. 

#### Code review
On the code review easy to catch wrong dependencies. You always see relationships. Even more, we can use modules to assign a responsible team for the review automatically. 

#### Refactoring
Moving, change, delete a code it becomes easier. For example, deleting any module takes only two steps:

1. Delete `/modules/MODULE_NAME`
2. Delete `/pages/MODULE_NAME`

#### Testing
Tests can be written and run only for those modules where changes have been made. It just saves time and support.

#### Scaling
With the correct organization of the application, each module is a unified unit and can be separated into an independent application without loss of operability and complex changes in the code structure of the parent application.

## Conclusion
In conclusion, embracing a modular approach to organizing React applications not only enhances code maintainability and scalability but also fosters collaboration among development teams. By breaking down complex systems into smaller, manageable components, developers can more effectively troubleshoot issues, update features, and streamline the development process. This modular mindset not only aligns with React's component-based architecture but also empowers teams to adapt and evolve their applications with greater ease. As we continue to navigate the dynamic landscape of web development, a modular approach stands as a reliable foundation for building robust, flexible, and sustainable React applications.
