# p5.viz

A p5.js library for visualization stuff written in TypeScript.


## Generic Flow

```mermaid
flowchart TB
    html[index.html] <--calls--> main[The acutal client sketch file]

    main <--uses--> index[index.js]

    subgraph library
        index <--exposes--> library-elms

        subgraph library-elms[Individual Elements]
            node[Node]

            tree[Tree]

            array[Array]
        end
    end
```

## Class Design

<!-- TODO: Add Text Here -->
```mermaid
---
title: p5.viz classes
---
classDiagram
    class Shape <<abstract>> {
        - p5 p
        + boolean highlighted
        + boolean hidden
        + draw()
    }

    note for Shape "Properties are of two kinds. Contructional and Rendering Type. "

    namespace p5.wrapper {
        class Circle {
            + elipseMode
            + x
            + y
            + d
        }

        class Text {
            + text
            + x
            + y
            + maxWidth?
            + maxHeight?
        }

    }

    class Node {
    }

    Shape <|-- Circle
    Shape <|-- Node

    Circle *-- Node
    Text *-- Node

```