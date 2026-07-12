import * as p_ from 'pareto-core/interface/data'

import type * as s_location from "./location.js"
import type * as s_parse_tree from "./parse_tree.js"

export type Value = {
    'range': s_location.Range
    'type': Value_Type
}

export type Value_Type =
    | ['array', Array]
    | ['boolean', Boolean]
    | ['null', Null]
    | ['number', Number]
    | ['object', Object]
    | ['string', String]

export type Null = s_parse_tree.Text

export type String = s_parse_tree.Text

export type Boolean = {
    'text': s_parse_tree.Text
    'value': boolean
}

export type Number = {
    'text': s_parse_tree.Text
    'value': number
}

export type Array = {
    'items': p_.List<Value>
}

export type Key_Value_Pair = {
    'key': s_parse_tree.Text
    'value': Value
}

export type Object = {
    'dictionary': s_parse_tree.Value.type_.concrete.dictionary
    'entries': p_.List<Key_Value_Pair>
}
