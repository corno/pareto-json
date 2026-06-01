import * as d_location from "astn-core/dist/interface/generated/liana/schemas/location/data"

export type Error = {
    'range': d_location.Range
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