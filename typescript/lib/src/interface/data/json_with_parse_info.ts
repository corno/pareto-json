import * as p_ from 'pareto-core/interface/data'

import * as d_location from "astn-core/interface/generated/liana/schemas/location/data"
import * as d_parse_tree from "astn-core/interface/generated/liana/schemas/parse_tree/data"

export type Value = {
    'range': d_location.Range
    'type': Value_Type
}

export type Value_Type =
    | ['array', Array]
    | ['boolean', Boolean]
    | ['null', Null]
    | ['number', Number]
    | ['object', Object]
    | ['string', String]

export type Null = d_parse_tree.Text

export type String = d_parse_tree.Text

export type Boolean = {
    'text': d_parse_tree.Text
    'value': boolean
}

export type Number = {
    'text': d_parse_tree.Text
    'value': number
}

export type Array = {
    'items': p_.List<Value>
}

export type Key_Value_Pair = {
    'key': d_parse_tree.Text
    'value': Value
}

export type Object = {
    'dictionary': d_parse_tree.Value.type_.concrete.dictionary
    'entries': p_.List<Key_Value_Pair>
}
