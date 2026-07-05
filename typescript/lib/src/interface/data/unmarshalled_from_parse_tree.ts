
import * as d_unmarshalled_from_json from "./unmarshalled_from_json.js"
import * as d_json_from_parse_tree from "./json_from_parse_tree_refiner.js"

export type Error =
    | ['json', d_json_from_parse_tree.Error]
    | ['unmarshall', d_unmarshalled_from_json.Error]
