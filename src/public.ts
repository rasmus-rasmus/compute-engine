export type ErrorListener<T> = (err: {
  code: T;
  arg?: string;
  latex?: string;
  before?: string;
  after?: string;
}) => void;

/**
 * * `unknown-symbol`: a symbol was encountered which does not have a
 * definition.
 *
 * * `unknown-operator`: a presumed operator was encountered which does not
 * have a definition.
 *
 * * `unknown-function`: a Latex command was encountered which does not
 * have a definition.
 *
 * * `unexpected-command`: a Latex command was encountered when only a string
 * was expected
 *
 * * `unexpected-superscript`: a superscript was encountered in an unexpected
 * context, or no `powerFunction` was defined. By default, superscript can
 * be applied to numbers, symbols or expressions, but not to operators (e.g.
 * `2+^34`) or to punctuation.
 *
 * * `unexpected-subscript`: a subscript was encountered in an unexpected
 * context or no 'subscriptFunction` was defined. By default, subscripts
 * are not expected on numbers, operators or symbols. Some commands (e.g. `\sum`)
 * do expected a subscript.
 *
 * * `unexpected-sequence`: some adjacent elements were encountered (for
 * example `xy`), but no `invisibleOperator` is defined, therefore the elements
 * can't be combined. The default `invisibleOperator` is `multiply`, but you
 * can also use `list`.
 *
 * * `expected-argument`: a Latex command that requires one or more argument
 * was encountered without the required arguments.
 *
 * * `expected-operand`: an operator was encountered without its required
 * operands.
 *
 * * `non-associative-operator`: an operator which is not associative was
 * encountered in an associative context, for example: `a < b < c` (assuming
 * `<` is defined as non-associative)
 *
 * * `postfix-operator-requires-one-operand`: a postfix operator which requires
 * a single argument was encountered with no arguments or more than one argument
 *
 * * `prefix-operator-requires-one-operand`: a prefix operator which requires
 * a single argument was encountered with no arguments or more than one argument
 *
 * * `base-out-of-range`:  The base is expected to be between 2 and 36.
 *
 */
export type ErrorCode =
  | 'expected-argument'
  | 'unexpected-argument'
  | 'expected-operator'
  | 'expected-operand'
  | 'invalid-name'
  | 'invalid-dictionary-entry'
  | 'unknown-symbol'
  | 'unknown-operator'
  | 'unknown-function'
  | 'unknown-command'
  | 'unexpected-command'
  | 'unbalanced-symbols'
  | 'unexpected-superscript'
  | 'unexpected-subscript'
  | 'unexpected-sequence'
  | 'non-associative-operator'
  | 'function-has-too-many-arguments'
  | 'function-has-too-few-arguments'
  | 'operator-requires-one-operand'
  | 'infix-operator-requires-two-operands'
  | 'prefix-operator-requires-one-operand'
  | 'postfix-operator-requires-one-operand'
  | 'associative-function-has-too-few-arguments'
  | 'commutative-function-has-too-few-arguments'
  | 'threadable-function-has-too-few-arguments'
  | 'hold-first-function-has-too-few-arguments'
  | 'hold-rest-function-has-too-few-arguments'
  | 'base-out-of-range'
  | 'syntax-error';

export type Attributes = {
  /** A human readable string to annotate an expression, since JSON does not
   * allow comments in its encoding */
  comment?: string;

  /** A human readable string that can be used to indicate a syntax error or
   * other problem when parsing or evaluating an expression.
   */
  error?: string;

  /** A visual representation in LaTeX of the expression.
   *
   * This can be useful to preserve non-semantic details, for example
   * parentheses in an expression or styling attributes
   */
  latex?: string;

  /**
   * A short string indicating an entry in a wikibase.
   *
   * For example
   * `"Q167"` is the [wikidata entry](https://www.wikidata.org/wiki/Q167)
   *  for the Pi constant.
   */
  wikidata?: string;

  /** A base URL for the `wikidata` key.
   *
   * A full URL can be produced by concatenating this key with the `wikidata`
   * key. This key applies to this node and all its children.
   *
   * The default value is "https://www.wikidata.org/wiki/"
   */
  wikibase?: string;

  /** A short string indicating an entry in an OpenMath Content Dictionary.
   *
   * For example: `arith1/#abs`.
   *
   */
  openmathSymbol?: string;

  /** A base URL for an OpenMath content dictionary. This key applies to this
   * node and all its children.
   *
   * The default value is "http://www.openmath.org/cd".
   */
  openmathCd?: string;
};

export type MathJsonBasicNumber = 'NaN' | '-Infinity' | '+Infinity' | string;

export type MathJsonRealNumber = {
  num: MathJsonBasicNumber;
} & Attributes;

export type MathJsonSymbol = {
  sym: string;
} & Attributes;

export type MathJsonFunction = {
  fn: Expression[];
} & Attributes;

export type MathJsonDictionary = {
  dict: { [key: string]: Expression };
} & Attributes;

export type Expression =
  | MathJsonRealNumber
  // Shortcut for MathJsonRealNumber without metadata and in the JavaScript
  // 64-bit float range.
  | number
  | MathJsonSymbol
  // Shortcut for a MathJsonSymbol with no metadata. Or a string.
  | string
  | MathJsonFunction
  | MathJsonDictionary
  | Expression[];

export type DictionaryCategory =
  | 'algebra'
  | 'arithmetic'
  | 'calculus'
  | 'collections'
  | 'complex'
  | 'combinatorics'
  | 'core'
  | 'dimensions'
  | 'domains'
  | 'inequalities'
  | 'intervals'
  | 'linear-algebra'
  | 'logic'
  | 'numeric'
  | 'other'
  | 'physics'
  | 'polynomials'
  | 'relations'
  | 'rounding'
  | 'statistics'
  | 'transcendentals'
  | 'trigonometry'
  | 'units';
