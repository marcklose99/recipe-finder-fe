<script setup lang="ts">
import { ref } from "vue";
import { useRecipeCreationStore } from "@/stores/RecipeCreationStore";
const previewImage = ref(null)
const recipeCreationStore = useRecipeCreationStore();

function uploadImage(event: any) {
    const image = event.target.files[0];
    recipeCreationStore.file = image;
    recipeCreationStore.recipe.imageName = event.target.files[0].name;
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (e: any) => {
        previewImage.value = e.target.result;
    };
}
</script>
<template>
    <label v-show="!previewImage" for="image-upload" class="upload-label">
        <span>Image Upload</span>
        <input id="image-upload" type="file" @change="uploadImage($event)">
    </label>

    <div v-show="previewImage" class="preview-image-wrapper">
        <img :src="previewImage" class="uploaded-image" />
        <RefreshIcon @click="previewImage = null" />
    </div>
</template>

<style lang="scss">
.upload-label {
    position: relative;
    width: 50%;


    #image-upload {

        height: 124px;
        background-color: #f2f2f2;
    }

    .upload-label::before {
        content: '';
        position: absolute;
        top: 22px;
        left: 0;
        width: 100%;
        height: calc(100% - 22px);
        background-image: url("data:image/svg+xml,%3Csvg width='614' height='320' viewBox='0 0 614 320' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='614' height='320' fill='%23F2F2F2'/%3E%3Cpath d='M311.69 142.013C313.544 144.156 316.594 144.839 319.201 143.687C320.397 143.165 321.714 142.857 323.125 142.857C328.473 142.857 332.8 147.17 332.8 152.5C332.8 153.036 332.76 153.558 332.679 154.067C332.209 156.96 333.768 159.812 336.455 160.991C340.648 162.799 343.55 166.964 343.55 171.786C343.55 178.054 338.632 183.196 332.424 183.545C332.343 183.545 332.249 183.558 332.168 183.571H331.725H283.35C276.228 183.571 270.45 177.812 270.45 170.714C270.45 165.129 274.024 160.362 279.05 158.594C281.63 157.683 283.35 155.259 283.35 152.527V152.5C283.35 143.621 290.566 136.429 299.475 136.429C304.353 136.429 308.72 138.585 311.69 142.013ZM332.8 190V189.973C342.394 189.424 350 181.496 350 171.786C350 164.326 345.498 157.897 339.048 155.085C339.183 154.241 339.25 153.371 339.25 152.5C339.25 143.621 332.034 136.429 323.125 136.429C320.787 136.429 318.583 136.924 316.581 137.808C312.429 133.027 306.315 130 299.475 130C287.005 130 276.9 140.071 276.9 152.5V152.527C269.388 155.179 264 162.317 264 170.714C264 181.362 272.667 190 283.35 190H326.35H331.725H332.8ZM293.966 159.866C292.703 161.125 292.703 163.161 293.966 164.406C295.229 165.652 297.271 165.665 298.521 164.406L303.762 159.183V177.143C303.762 178.924 305.199 180.357 306.987 180.357C308.774 180.357 310.212 178.924 310.212 177.143V159.183L315.452 164.406C316.715 165.665 318.758 165.665 320.008 164.406C321.257 163.147 321.271 161.112 320.008 159.866L309.258 149.152C307.994 147.893 305.952 147.893 304.702 149.152L293.952 159.866H293.966Z' fill='%236565BB'/%3E%3C/svg%3E%0A");
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        border-radius: 5px;
        cursor: pointer;
    }

    .preview-image-wrapper {
        width: 50%;
        position: relative;

        .uploaded-image {
            width: 100%;
            height: 124px;
            object-fit: cover;
            margin-top: 22px;
            border-radius: 5px;
        }

        svg {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 42px;
            height: 42px;
            background-color: #6565bb;
            padding: 8px;
            border-radius: 50%;
            fill: #FFFFFF;
            cursor: pointer;
        }
    }
}
</style>