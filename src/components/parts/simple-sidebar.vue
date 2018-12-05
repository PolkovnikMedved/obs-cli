<template>
    <aside class="t-sidebar">
        <div class="l-row">
            <div class="l-col">
                <router-link :to="{ name: 'documents' }" class="c-btn c-btn--primary c-btn--raised spaced">Documents</router-link>
            </div>
            <div class="l-col">
                <button class="c-btn c-btn--primary c-btn--raised spaced">Structures</button>
            </div>
        </div>
    </aside>
</template>
