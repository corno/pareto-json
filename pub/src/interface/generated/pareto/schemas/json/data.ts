
import * as _pi from "pareto-core-interface"

import * as i__location from "../../core/location"

export namespace Value_ {
    
    export namespace array {
        
        export type L = Value_
        
    }
    
    export type array = _pi.List<array.L>
    
    export namespace _object {
        
        export namespace key_value_array {
            
            export namespace L {
                
                export type key = string
                
                export type value = Value_
                
            }
            
            export type L = {
                readonly 'key': L.key
                readonly 'value': L.value
            }
            
        }
        
        export type key_value_array = _pi.List<key_value_array.L>
        
        export namespace dictionary {
            
            export type D = Value_
            
        }
        
        export type dictionary = _pi.Dictionary<dictionary.D>
        
    }
    
    export type _object = 
        | readonly ['key value array', _object.key_value_array]
        | readonly ['dictionary', _object.dictionary]
    
    export namespace _number {
        
        export type integer = number
        
        export type float = number
        
    }
    
    export type _number = 
        | readonly ['integer', _number.integer]
        | readonly ['float', _number.float]
    
    export type _string = string
    
    export type _boolean = boolean
    
    export type _null = null
    
}

export type Value_ = 
    | readonly ['array', Value_.array]
    | readonly ['object', Value_._object]
    | readonly ['number', Value_._number]
    | readonly ['string', Value_._string]
    | readonly ['boolean', Value_._boolean]
    | readonly ['null', Value_._null]

export type Document_ = Value_

export { 
    Value_ as Value, 
    Document_ as Document, 
}
