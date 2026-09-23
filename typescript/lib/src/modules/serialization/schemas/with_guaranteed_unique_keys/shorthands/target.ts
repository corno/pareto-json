import * as p_ from 'pareto-core-shorthands/unconstrained_target'

import type * as s_out from "../schema.js"

export const array = (
    elements: p_.Normal_List<s_out.Value.array.L>
): s_out.Value => ['array', p_.list(elements)]

export const boolean = (
    value: boolean
): s_out.Value => ['boolean', value]

export const false_ = (
): s_out.Value => ['boolean', false]

export const integer = (
    value: number
): s_out.Value => ['number', ['integer', value]]

export const true_ = (
): s_out.Value => ['boolean', true]

export const null_ = (
): s_out.Value => ['null', null]

export const float = (
    value: number
): s_out.Value => ['number', ['float', value]]

export const object = (
    members: p_.Normal_Dictionary<s_out.Value.object_.D>
): s_out.Value => ['object', p_.dictionary(members)]

export const string = (
    value: string
): s_out.Value => ['string', value]

