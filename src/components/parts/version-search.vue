<template>
    <aside class="t-sidebar">
        <div class="l-row">
            <div class="l-col">
                <button class="c-btn c-btn--primary c-btn--raised spaced">Versions</button>
            </div>
            <div class="l-col">
                <button class="c-btn c-btn--primary c-btn--raised spaced">Structures</button>
            </div>
        </div>

        <form action="" class="c-form c-form--block">
            <fieldset class="c-form__fieldset">
                <legend class="c-form__legend">Search</legend>
                <div class="c-form__field-group">
                    <label for="doc-num" class="c-form__label s-text--bold">Doc N°</label>
                    <input id="doc-num" class="c-form__field full-width" type="text" name="doc-number" autocomplete="off">
                </div>
                <div class="c-form__field-group">
                    <label for="dfa-num" class="c-form__label s-text--bold">DFA N°</label>
                    <input id="dfa-num" class="c-form__field full-width" type="text" name="dfa-number" autocomplete="off">
                </div>
                <div class="c-form__field-group">
                    <label for="doc-name" class="c-form__label s-text--bold">Doc. name</label>
                    <input id="doc-name" class="c-form__field full-width" type="text" name="doc-name" autocomplete="off">
                </div>
                <div class="c-form__field-group">
                    <label for="doc-cat" class="c-form__label s-text--bold">Doc. Cat.</label>
                    <input id="doc-cat" class="c-form__field full-width" type="text" name="doc-cat" autocomplete="off">
                </div>
                <div class="c-form__field-group">
                    <label for="str-name" class="c-form__label s-text--bold">Str. name</label>
                    <input id="str-name" class="c-form__field full-width" type="text" name="str-name" autocomplete="off">
                </div>
                <div class="c-form__field-group">
                    <label for="author" class="c-form__label s-text--bold">Author</label>
                    <input id="author" class="c-form__field full-width" type="text" name="author" autocomplete="off">
                </div>
            </fieldset>
            <button class="c-btn c-btn--primary c-btn--raised c-btn--ripple c-form__button spaced-no-left full-width s-text--center" type="submit">Submit</button>
        </form>
    </aside>
</template>
