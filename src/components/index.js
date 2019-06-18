import Vue from "vue";
import ElasticSvgMenu from "./ElasticSvgMenu"

const Components = {
    ElasticSvgMenu
};

Object.keys(Components).forEach(name => {
    Vue.component(name,Components[name]);
});

module.exports = Components;
