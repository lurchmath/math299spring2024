
# The Lurch Core Classes Source Code Documentation

This API documentation covers the core classes underpinning the Lurch
application.  The navigation menu on the left shows classes and namespaces in
alphabetical order, but the overview below is more logically organized.

## Tutorials

Probably the easiest way to get familiar with the classes and methods defined
in this repository, together with how to use them, is to read the tutorials:

 * {@tutorial Constructing LCs}
 * {@tutorial Methods in each LC subclass}
 * {@tutorial LC tree hierarchies}
 * {@tutorial Serialization and attributes of LCs}
 * {@tutorial Free and bound variables}
 * {@tutorial Connections among LCs}
 * {@tutorial Pattern matching}
 * {@tutorial Lurch Node REPL}
 
## Foundational classes

Every symbolic math software needs some data structure for storing trees of
mathematical symbols that represent mathematical meaning.  In the LDE, the
most generic of these is the {@link MathConcept Math Concept}.

Later, complex math concepts will be able to be compiled down to a set of
simpler special cases that can be processed by the LDE.  We call that simpler
subset the {@link LogicConcept Logic Concepts}, or LCs for short.

Logic concepts come in three types: {@link Environment Environment},
{@link Declaration Declaration}, and {@link Expression Expression}.

Environments are either the base type, {@link Environment Environment}, or a
subclass called {@link BindingEnvironment Binding Environment}, which can bind
symbols, such as when constructing subproofs about arbitrary variables.

Expressions come in three types: {@link Symbol Symbol},
{@link Application Application}, and
{@link BindingExpression Binding Expression}.

## Other tools

Other basic tools support the classes above, including:

 * a class for {@link Connection connecting} math concept instances
   irrespective of tree structure,
 * functions for working with {@link JSON JSON} and
   {@link predictableStringify serializing it}.

There is also a host of advanced tools for doing {@link module:Matching pattern
matching} with {@link LogicConcept Logic Concept} instances.

And when working in the test suite, feel free to import
{@link Database the Database module} for access to a library of
{@link LogicConcept Logic Concept} instances written in
{@link LogicConcept.fromPutdown putdown} notation, with
corresponding metadata.

## GitHub

[This repository](http://github.com/lurchmath/lurch) is for the full Lurch
project, not just the core classes documented here.