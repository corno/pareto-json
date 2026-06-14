import * as pt from 'pareto-core-shorthands/dist/unconstrained'

import * as d_out from "../interface/generated/liana/schemas/json_without_guaranteed_unique_keys/data"


export namespace v {

    export const string = (
        value: string
    ): d_out.Value => ['string', value]

    export const null_ = (
    ): d_out.Value => ['null', null]

    export const object = (
        members: pt.Raw_Or_Normal_List<d_out.Value.object_.L>
    ): d_out.Value => ['object', pt.list.literal(members)]

    export const array = (
        elements: pt.Raw_Or_Normal_List<d_out.Value.array.L>
    ): d_out.Value => ['array', pt.list.literal(elements)]
}