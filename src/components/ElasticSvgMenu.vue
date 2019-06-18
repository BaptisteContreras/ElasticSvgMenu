<template>
    <div>
        <nav id="menu" :class="getMenuState">
            <div ref="mshapeElem" class="morph-shape" :style="{height:SvgHeight+'px'}"
                 data-morph-open="M260,500H0c0,0,8-120,8-250C8,110,0,0,0,0h260c0,0-8,110-8,250C252,380,260,500,260,500z">
                <svg ref="svgElem" width="100%" height="100%" viewBox="0 0 260 500" preserveAspectRatio="none">
                    <path ref="pathElem" :fill="svgColor"
                          d="M260,500H0c0,0,0-120,0-250C0,110,0,0,0,0h260c0,0,0,110,0,250C260,380,260,500,260,500z"/>
                </svg>
            </div>
            <button class="btn__menu" @click="toggleMenu">
                <div class="menu__label" :style="{color:textColor}"><i class="fa fa-bars menu__icon"></i><span>{{defaultText}}</span>
                </div>
            </button>
            <div class="menu__content" :style="{height:contentHeight+'px'}">
                <ul ref="ulElem" :style="{color: colorMenuItem}">
                    <slot></slot>
                </ul>
            </div>

        </nav>

    </div>
</template>

<script>
    /* eslint-disable */
    const Snap = require(`imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js`);


    export default {
        name: "ElasticSvgMenu",
        props: {
            iconClass: {
                type: String,
                required: false,
                default: 'fa'
            },
            svgColor: {
                type: String,
                required: false,
                default: '#C6CFCF'
            },
            defaultText: {
                type: String,
                required: false,
                default: 'Open menu'
            },
            minSvgHeight: {
                type: String,
                required: false,
                default: 70
            },
            maxDefaultSvgHeight: {
                required: false,
                default: 'auto'
            },
            defaultMaxHeight: {
                required: false,
                default: 'auto'
            },
            textColor: {
                type: String,
                required: false,
                default: "white"
            },
            itemColor: {
                type: String,
                required: false,
                default: "#727476"
            },
            itemColorHover: {
                type: String,
                required: false,
                default: "#45484A"
            }

        },
        data() {
            return {
                isOpen: false,
                paths: {},
                snapElem: null,
                initFromSlot: true,
                contentHeight: 0,
                maxHeight: 200,
                maxSvgHeight: 270,
                SvgHeight: 70,
                colorMenuItem: "#727476"

            };
        },
        mounted() {
            this.paths.open = this.$refs.mshapeElem.getAttribute("data-morph-open");
            // this.paths.close = this.$refs.mshapeElem.getAttribute("data-morph-close");
            this.paths.reset = this.$refs.pathElem.getAttribute("d");
            this.snapElem = Snap(this.$refs.svgElem);
            this.initFromSlot = this.$slots.default.length > 0;

            this.colorMenuItem = this.itemColor;

            this.initSlot();
            if (this.maxDefaultSvgHeight === 'auto') {
                this.initSvgMaxHeight();
            } else {
                this.maxSvgHeight = this.maxDefaultSvgHeight;
            }
            if (this.defaultMaxHeight === 'auto') {
                this.initMaxHeight();
            } else {
                this.maxHeight = this.defaultMaxHeight;
            }
            console.log(this.$slots.default.length);


        },
        computed: {
            getMenuState: function () {
                return this.isOpen ? "menu menu__open" : "menu";
            }
        },
        methods: {
            overMenuItem() {
                this.colorMenuItem = this.itemColorHover;
            },
            outMenuItem() {
                this.colorMenuItem = this.itemColor;
            },
            initMaxHeight: function () {
                this.maxHeight = (this.$slots.default.length * 50);
            },
            initSvgMaxHeight: function () {
                this.maxSvgHeight = (this.$slots.default.length * 50) + this.minSvgHeight;
            },
            toggleMenu: function () {
                let _this = this;
                let pathE = this.snapElem.select('path');
                if (this.isOpen) {
                    this.contentHeight = 0;
                    this.SvgHeight = this.minSvgHeight;
                } else {
                    this.contentHeight = this.maxHeight;
                    this.SvgHeight = this.maxSvgHeight;
                }
                this.isOpen = !this.isOpen;
                pathE.stop().animate({'path': this.paths.open}, 320, mina.easeinout, function () {
                    pathE.stop().animate({'path': _this.paths.reset}, 1000, mina.elastic);
                });

            },
            initSlot: function () {
                let slots = this.$refs.ulElem.childNodes;
                let delay = 0.04;
                for (let i = 0; i < slots.length; i++) {
                    slots[i].firstChild.style.transitionDelay = delay + "s";
                    delay += 0.04;
                }
            },

        }
    };
</script>

<style scoped>

    .menu {
        cursor: pointer;
        width: 300px;
        height: 70px;
        z-index: 100;
        position: relative;
        text-align: left;
        font-family: 'Roboto', sans-serif;

    }

    .menu__label {
        font-weight: bold;
        display: inline-block;
    }

    .btn__menu:focus {
        outline: 0;
    }

    .btn__menu {
        cursor: pointer;
        width: 100%;
        border: none;
        height: 70px;
        background: none;
        color: white;
        font-size: 1.3em;
        display: block;
        position: relative;
        text-align: left;


    }


    .menu__icon {
        margin-right: 10px;
        margin-left: 25px;
    }

    .morph-shape,
    .morph-shape svg {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
    }

    .morph-shape {
        height: 70px;
        -webkit-transition: height 0.5s cubic-bezier(0.7, 0, 0.3, 1);
        transition: height 0.5s cubic-bezier(0.7, 0, 0.3, 1);
    }

    .morph-shape svg {
        height: 100%;
    }


    .menu__content {
        transition: .3s;

    }

    .menu__content li {
        margin-top: 20px;
        list-style: none;
    }

    .menu__content li a:visited {
        color: inherit;
    }

    .menu__content li a {
        display: block;
        font-size: 1.3em;
        text-decoration: none;
        /* color: #45484A;*/
        opacity: 0;
        pointer-events: none;
        -webkit-transform: translateY(-20px);
        transform: translateY(-20px);
        -webkit-transition: opacity 0.3s, -webkit-transform 0.3s;
        transition: opacity 0.3s, transform 0.3s;
    }


    .menu__open .menu__content li a {
        pointer-events: auto;
        opacity: 1;
        -webkit-transform: translateY(0px);
        transform: translateY(0px);
    }

    .menu .menu__content {
        height: 0px;
        overflow: hidden;
    }

    .menu__content li a:hover {
        color: #45484A;
    }

    .menu__content li a:active {
        color: #45484A;
    }

</style>
