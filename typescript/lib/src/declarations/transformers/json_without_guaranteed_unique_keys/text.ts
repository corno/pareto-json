import type * as p_ from 'pareto-core/interface/transformer'

//schemas
import type * as s_in from "../../../interface/schemas/json_without_guaranteed_unique_keys.js"
import type * as s_out from "pareto-fountain-pen/interface/data/text"
import type * as s_parameter from "pareto-fountain-pen/interface/data/prose_serialize"


export type Value = p_.Transformer_With_Parameter<
    s_in.Value,
    s_out.Text,
    s_parameter.Parameters
>

