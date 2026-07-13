import * as p_ from 'pareto-core-shorthands/unconstrained_target'

import type * as s_out from "../../interface/schemas/json_without_guaranteed_unique_keys.js"

namespace v {

    export const string = (
        value: string
    ): s_out.Value => ['string', value]

    export const null_ = (
    ): s_out.Value => ['null', null]

    export const object = (
        members: p_.Normal_List<s_out.Value.object_.L>
    ): s_out.Value => ['object', p_.list(members)]

    export const array = (
        elements: p_.Normal_List<s_out.Value.array.L>
    ): s_out.Value => ['array', p_.list(elements)]
    
}