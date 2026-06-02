import * as _pi from 'pareto-core/dist/interface'

import * as d_location from "astn-core/dist/interface/generated/liana/schemas/location/data"
import * as d_parse_tree from "astn-core/dist/interface/generated/liana/schemas/parse_tree/data"

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

export type Null = null

export type String = string

export type Boolean = boolean

export type Number = number

export type Array = {
    'items': _pi.List<Value>
}

export type Key_Value_Pair = {
    'key': d_parse_tree.Text
    'value': Value
}

export type Object = {
    'dictionary': d_parse_tree.Value.type_.concrete.dictionary
    'entries': _pi.List<Key_Value_Pair>
}

export type Object_Static = {
    'range': d_location.Range
    'properties': _pi.Dictionary<Key_Value_Pair>
}

export type Object_No_Unexpected_Properties = Object_Static

export type Property = Key_Value_Pair
