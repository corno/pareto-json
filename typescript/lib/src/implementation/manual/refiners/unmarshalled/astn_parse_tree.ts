// import * as p_di from 'pareto-core/dist/data/interface'
// import * as pt from 'pareto-core/dist/assign'

// //data types
// import * as d_in from "astn-core/dist/interface/generated/liana/schemas/parse_tree/data"
// import * as d_function from "../../../../interface/to_be_generated/unmarshalled_from_parse_tree_x"
// import * as d_location from "astn-core/dist/interface/generated/liana/schemas/location/data"

// import * as d_astn_unmarshalled from "astn-core/dist/interface/to_be_generated/unmarshalled"

// //dependencies
// import * as r_astn_unmarshalled_from_parse_tree from "astn-core/dist/implementation/manual/refiners/unmarshalled/parse_tree"
// import * as t_astn_parse_tree_to_location from "astn-core/dist/implementation/manual/transformers/parse_tree/start_token_range"
// import * as r_primitives_from_loc from "../primitives/list_of_characters"
// import p_list_from_text from 'pareto-core/dist/specials/list_from_text'


// export const Array_Dynamic = (
//     $: d_in.Value,
//     abort: p_i.Abort<d_function.Error>,
// ) => {
//     return r_astn_unmarshalled_from_parse_tree.List(
//         $,
//         ($) => abort(['astn', $]),
//     )
// }

// export const Boolean = (
//     $: d_in.Value,
//     abort: p_i.Abort<d_function.Error>,
// ): boolean => {
//     const value = $
//     return pt.decide.state($.type, ($) => {
//         switch ($[0]) {
//             case 'concrete': return pt.ss($, ($): boolean => pt.decide.state($, ($) => {
//                 switch ($[0]) {
//                     case 'text': return pt.ss($, ($) => {
//                         const text_value = $
//                         return pt.decide.state($.token.type, ($) => {
//                             switch ($[0]) {
//                                 case 'undelimited': return pt.ss($, ($) => text_value.token.value === "true"
//                                     ? true
//                                     : text_value.token.value === "false"
//                                         ? false
//                                         : abort(['json', {
//                                             'type': ['not a boolean', null],
//                                             'range': t_astn_parse_tree_to_location.Value(value),
//                                         }])
//                                 )
//                                 default: return abort(['json', {
//                                     'type': ['not a boolean', null],
//                                     'range': t_astn_parse_tree_to_location.Value(value),
//                                 }])
//                             }
//                         })
//                     })
//                     default: return abort(['json', {
//                         'type': ['not a boolean', null],
//                         'range': t_astn_parse_tree_to_location.Value(value),
//                     }])
//                 }
//             }))
//             default: return abort(['json', {
//                 'type': ['not a boolean', null],
//                 'range': t_astn_parse_tree_to_location.Value(value),
//             }])
//         }
//     })
// }

// export const Null = (
//     $: d_in.Value,
//     abort: p_i.Abort<d_function.Error>,
// ): null => {
//     const value = $
//     return pt.decide.state($.type, ($) => {
//         switch ($[0]) {
//             case 'concrete': return pt.ss($, ($): null => pt.decide.state($, ($) => {
//                 switch ($[0]) {
//                     case 'text': return pt.ss($, ($) => {
//                         const text_value = $
//                         return pt.decide.state($.token.type, ($) => {
//                             switch ($[0]) {
//                                 case 'undelimited': return pt.ss($, ($) => text_value.token.value === "null"
//                                     ? null
//                                     : abort(['json', {
//                                         'type': ['not a null', null],
//                                         'range': t_astn_parse_tree_to_location.Value(value),
//                                     }])
//                                 )
//                                 default: return abort(['json', {
//                                     'type': ['not a null', null],
//                                     'range': t_astn_parse_tree_to_location.Value(value),
//                                 }])
//                             }
//                         })
//                     })
//                     default: return abort(['json', {
//                         'type': ['not a null', null],
//                         'range': t_astn_parse_tree_to_location.Value(value),
//                     }])
//                 }
//             }))
//             default: return abort(['json', {
//                 'type': ['not a null', null],
//                 'range': t_astn_parse_tree_to_location.Value(value),
//             }])
//         }
//     })
// }

// export const Number = (
//     $: d_in.Value,
//     abort: p_i.Abort<d_function.Error>,
// ): number => {
//     const value = $
//     return pt.decide.state($.type, ($) => {
//         switch ($[0]) {
//             case 'concrete': return pt.ss($, ($) => pt.decide.state($, ($) => {
//                 switch ($[0]) {
//                     case 'text': return pt.ss($, ($) => {
//                         const text_value = $
//                         return pt.decide.state($.token.type, ($) => {
//                             switch ($[0]) {
//                                 case 'undelimited': return pt.ss($, ($) => r_primitives_from_loc.Number(
//                                     p_list_from_text(
//                                         text_value.token.value,
//                                         ($) => $,
//                                     ),
//                                     () => abort(['json', {
//                                         'type': ['not a number', null],
//                                         'range': t_astn_parse_tree_to_location.Value(value),
//                                     }]),
//                                 ))
//                                 default: return abort(['json', {
//                                     'type': ['not a number', null],
//                                     'range': t_astn_parse_tree_to_location.Value(value),
//                                 }])
//                             }
//                         })
//                     })
//                     default: return abort(['json', {
//                         'type': ['not a number', null],
//                         'range': t_astn_parse_tree_to_location.Value(value),
//                     }])
//                 }
//             }))
//             default: return abort(['json', {
//                 'type': ['not a number', null],
//                 'range': t_astn_parse_tree_to_location.Value(value),
//             }])
//         }
//     })
// }

// export const Object_Dynamic = (
//     $: d_in.Value,
//     abort: p_i.Abort<d_function.Error>,
// ) => r_astn_unmarshalled_from_parse_tree.Dictionary(
//     $,
//     ($) => abort(['astn', $]),
// )

// export const Object_Static = (
//     $: d_in.Value,
//     abort: p_i.Abort<d_function.Error>,
//     $p: {
//         'expected properties': p_di.Dictionary<null>
//     }
// ) => {
//     const dictionary = r_astn_unmarshalled_from_parse_tree.Dictionary(
//         $,
//         ($) => abort(['astn', $]),
//     )

//     const unexpected_properties = pt.dictionary.from.dictionary(
//         pt.dictionary.from.dictionary(
//             dictionary.entries,
//         ).join(
//             $p['expected properties'],
//             ($, other, id): p_di.Optional_Value<d_location.Range> => pt.decide.optional(
//                 other,
//                 () => pt.optional.literal.not_set(),
//                 () => pt.optional.literal.set($.id.range)
//             )
//         )
//     ).map_optionally(
//         ($) => $
//     )

//     if (unexpected_properties.__get_number_of_entries() > 0) {
//         return abort(['json', {
//             'type': ['unexpected properties', unexpected_properties],
//             'range': t_astn_parse_tree_to_location.Value($),
//         }])
//     }

//     return dictionary
// }

// export const Optional_Null = (
//     $: d_in.Value,
// ): p_di.Optional_Value<d_in.Value> => {
//     const value = $
//     return pt.decide.state($.type, ($) => {
//         switch ($[0]) {
//             case 'concrete': return pt.ss($, ($) => pt.decide.state($, ($) => {
//                 switch ($[0]) {
//                     case 'text': return pt.ss($, ($) => {
//                         const text_value = $
//                         return pt.decide.state($.token.type, ($) => {
//                             switch ($[0]) {
//                                 case 'undelimited': return pt.ss($, ($) => text_value.token.value === "null"
//                                     ? pt.optional.literal.not_set()
//                                     : pt.optional.literal.set(value)
//                                 )
//                                 default: return pt.optional.literal.set(value)
//                             }
//                         })
//                     })
//                     default: return pt.optional.literal.set(value)
//                 }
//             }))
//             default: return pt.optional.literal.set(value)
//         }
//     })
// }

// export const Property = (
//     $: d_astn_unmarshalled.Dictionary,
//     abort: p_i.Abort<d_function.Error>,
//     $p: {
//         'id': string
//     }
// ): d_in.Value => {
//     const dict = $
//     return $.entries.__get_entry_deprecated(
//         $p.id,
//         {
//             no_such_entry: ($) => abort(['json', {
//                 'type': ['missing property', $p.id],
//                 'range': t_astn_parse_tree_to_location.Value(dict.value),
//             }])
//         }
//     ).assignment.__decide(
//         ($) => $.value.__decide(
//             ($) => $,
//             () => abort(['json', {
//                 'type': ['missing property', $p.id],
//                 'range': t_astn_parse_tree_to_location.Value(dict.value),
//             }])

//         ),
//         () => abort(['json', {
//             'type': ['missing property', $p.id],
//             'range': t_astn_parse_tree_to_location.Value(dict.value),
//         }])
//     )
// }

// export const String = (
//     $: d_in.Value,
//     abort: p_i.Abort<d_function.Error>,
// ) => {
//     const xxx = r_astn_unmarshalled_from_parse_tree.Text(
//         $,
//         ($) => abort(['astn', $]),
//     )
//     if (xxx.token.type[0] !== 'quoted') {
//         return abort(['json', {
//             'type': ['not a string', null],
//             'range': t_astn_parse_tree_to_location.Value($),
//         }])
//     }
//     return xxx.token.value
// }

