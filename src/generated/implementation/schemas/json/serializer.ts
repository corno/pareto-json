import * as _pa from 'exupery-core-alg'
import * as _pd from 'exupery-core-dev'

import * as _i_out from "../../../interface/core/astn_target"
import * as _i_signatures from "../../../interface/schemas/json/serializer"


export const Document: _i_signatures._T_s_Document = ($, $p) => Value(
    $,
    {
        'value serializers': $p['value serializers'],
    }
)
export const Value: _i_signatures._T_s_Value = ($, $p) => ['state', _pa.cc($, ($): _i_out._T_Value.SG.state => {
    switch ($[0]) {
        case 'array': return _pa.ss($, ($) => ({
            'state': "array",
            'value': ['list', $.map(($) => Value(
                $,
                {
                    'value serializers': $p['value serializers'],
                }
            ))],
        }))
        case 'boolean': return _pa.ss($, ($) => ({
            'state': "boolean",
            'value': ['text', ({
                'delimiter': ['quote', null],
                'value': $p['value serializers']['boolean'](
                    $,
                    null
                ),
            })],
        }))
        case 'null': return _pa.ss($, ($) => ({
            'state': "null",
            'value': ['nothing', null],
        }))
        case 'number': return _pa.ss($, ($) => ({
            'state': "number",
            'value': ['state', _pa.cc($, ($): _i_out._T_Value.SG.state => {
                switch ($[0]) {
                    case 'float': return _pa.ss($, ($) => ({
                        'state': "float",
                        'value': ['text', ({
                            'delimiter': ['backtick', null],
                            'value': "FIXME NUMBER",
                        })],
                    }))
                    case 'integer': return _pa.ss($, ($) => ({
                        'state': "integer",
                        'value': ['text', ({
                            'delimiter': ['backtick', null],
                            'value': "FIXME NUMBER",
                        })],
                    }))
                    default: return _pa.au($[0])
                }
            })],
        }))
        case 'object': return _pa.ss($, ($) => ({
            'state': "object",
            'value': ['state', _pa.cc($, ($): _i_out._T_Value.SG.state => {
                switch ($[0]) {
                    case 'dictionary': return _pa.ss($, ($) => ({
                        'state': "dictionary",
                        'value': ['dictionary', $.map(($) => Value(
                            $,
                            {
                                'value serializers': $p['value serializers'],
                            }
                        ))],
                    }))
                    case 'key value array': return _pa.ss($, ($) => ({
                        'state': "key value array",
                        'value': ['list', $.map(($) => ['verbose group', _pa.dictionary_literal({
                            'key': _pa.cc($['key'], ($) => ['text', ({
                                'delimiter': ['quote', null],
                                'value': $,
                            })]),
                            'value': _pa.cc($['value'], ($) => Value(
                                $,
                                {
                                    'value serializers': $p['value serializers'],
                                }
                            )),
                        })])],
                    }))
                    default: return _pa.au($[0])
                }
            })],
        }))
        case 'string': return _pa.ss($, ($) => ({
            'state': "string",
            'value': ['text', ({
                'delimiter': ['quote', null],
                'value': $,
            })],
        }))
        default: return _pa.au($[0])
    }
})]
