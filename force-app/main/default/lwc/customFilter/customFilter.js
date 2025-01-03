import { LightningElement} from 'lwc';
import {LABELS} from "c/customUtilities";

export default class CustomFilter extends LightningElement {

    brand = 'None';
    category = 'None';
    
    get brands() {
        return LABELS.Filter.Brands;
    }

    get categories() {
        return LABELS.Filter.Categories;
    }

    handleBrands(event) {
        this.brand = event.detail.value;
    }
    
    handleCategories(event) {
        this.category = event.detail.value;
    }

    search() {
        const valueToFilterEvent = new CustomEvent("valuetofilterevent", {
            detail : { brand : this.brand, category : this.category}
        }); 
        this.dispatchEvent(valueToFilterEvent);
    }
}