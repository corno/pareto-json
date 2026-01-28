
import * as _p from "pareto-core/dist/deserializer"

import * as t_signatures from "../../../../../interface/generated/liana/schemas/json/deserialize"

import * as v_deserialize from "astn-core/dist/implementation/manual/schemas/parse_tree/deserializers"

import * as v_unmarshall from "./unmarshall"
export const Value: t_signatures.Value = ($, abort) => v_unmarshall.Value(v_deserialize.Document($, () => abort(['tbd', null]), {
    'document resource identifier': "FIXME URI",
    'tab size': 4,
}).content, abort)
export const Document: t_signatures.Document = ($, abort) => v_unmarshall.Document(v_deserialize.Document($, () => abort(['tbd', null]), {
    'document resource identifier': "FIXME URI",
    'tab size': 4,
}).content, abort)