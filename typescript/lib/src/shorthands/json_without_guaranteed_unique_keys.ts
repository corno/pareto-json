import * as _p from 'pareto-core-shorthands/dist/unconstrained'

import * as d_out from "../interface/generated/liana/schemas/json_without_guaranteed_unique_keys/data"


export namespace v {

    export const string = (
        value: string
    ): d_out.Value => ['string', value]

    export const null_ = (
    ): d_out.Value => ['null', null]

    export const object = (
        members: _p.Raw_Or_Normal_List<d_out.Value.object_.L>
    ): d_out.Value => ['object', _p.list.literal(members)]

    export const array = (
        elements: _p.Raw_Or_Normal_List<d_out.Value.array.L>
    ): d_out.Value => ['array', _p.list.literal(elements)]
}