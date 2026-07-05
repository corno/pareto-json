import * as d_deserialize from "astn-core/interface/generated/liana/schemas/deserialize_parse_tree/data"
import * as d_json_from_parse_tree from "./json_from_parse_tree_refiner.js"

export type Error = 
| ['deserialize astn parse tree', d_deserialize.Error]
| ['jsonify', d_json_from_parse_tree.Error]