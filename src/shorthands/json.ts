import * as pd from 'exupery-core-data'

import * as _out from "../generated/interface/schemas/json/data_types/target"

import {
    Raw_Or_Normal_Dictionary,
    Raw_Dictionary,
    wrap_dictionary,
    wrap_state_group,
} from 'exupery-core-data/dist/shorthands/unconstrained'

export namespace v {

    export const string = (
        value: string
    ): _out.Value => ['string', value]

    export const null_ = (
    ): _out.Value => ['null', null]

    export const object = (
        members: Raw_Dictionary<_out.Value.SG._object.SG.dictionary.D>
    ): _out.Value => ['object', ['dictionary', pd.d(members)]]

    export const array = (
        elements: _out.Value.SG.array.L[]
    ): _out.Value => ['array', pd.a(elements)]

}