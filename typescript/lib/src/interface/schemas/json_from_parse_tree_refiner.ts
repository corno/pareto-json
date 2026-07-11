import type * as s_location from "astn-core/interface/data/location"

export type Error = {
    'range': s_location.Range
    'type': Error_Type
}

export type Error_Type =
    | ['missing property', null]
    | ['apostrophed text', null]
    | ['backticked text', null]
    | ['undelimited text', null]
    | ['group', null]
    | ['include', null]
    | ['missing data', null]
    | ['nothing', null]
    | ['optional', null]
    | ['state', null]