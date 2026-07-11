import type * as p_ from 'pareto-core/interface/transformer'

import type * as s_in from "../../../interface/schemas/json_with_guaranteed_unique_keys.js"
import type * as s_out from "pareto-fountain-pen/interface/data/list_of_characters"
import type * as s_parameter from "pareto-fountain-pen/interface/data/prose_serialize"

export type Value = p_.Transformer_With_Parameter<
    s_in.Value,
    s_out.List_of_Characters,
    s_parameter.Parameters
>

