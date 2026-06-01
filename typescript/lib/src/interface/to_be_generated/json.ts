import * as _pi from 'pareto-core/dist/interface'

import * as d_location from "astn-core/dist/interface/generated/liana/schemas/location/data"

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
    'key': string
    'value': Value
}

export type Object = {
    'entries': _pi.List<Key_Value_Pair>
}

export type Property = Value
