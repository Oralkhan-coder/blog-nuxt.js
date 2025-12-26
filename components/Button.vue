<template>
    <component :is="tag" :type="tag === 'button' ? type : undefined" :class="[
        'btn',
        `btn--${variant}`,
        { 'btn--block': block }
    ]" v-bind="$attrs">
        <slot />
    </component>
</template>

<script>
export default {
    name: 'Button',
    props: {
        variant: {
            type: String,
            default: 'primary',
        },
        type: {
            type: String,
            default: 'button',
        },
        tag: {
            type: String,
            default: 'button',
        },
        block: {
            type: Boolean,
            default: false,
        },
    }
}
</script>

<style scoped>
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-family: inherit;
    font-weight: 700;
    font-size: 1.1rem;
    padding: 1.2rem 2.5rem;
    border-radius: 12px;
    border: none;
    color: white;
    text-decoration: none;
    transition: transform 0.2s, box-shadow 0.2s, background 0.3s;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
}

/* Full width (form buttons) */
.btn--block {
    width: 100%;
}

/* Primary button (form submit) */
.btn--primary {
    background: linear-gradient(135deg,
            var(--primary-color),
            #3b82f6);
    box-shadow: 0 5px 15px rgba(74, 144, 226, 0.3);
}

.btn--primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(74, 144, 226, 0.4);
}

.btn--primary:active {
    transform: translateY(1px);
}

/* Secondary / Home button */
.btn--secondary {
    border-radius: 50px;
    padding: 1rem 3rem;
    background: linear-gradient(90deg,
            var(--secondary-color),
            #32d6b3);
    box-shadow: 0 5px 15px rgba(50, 214, 179, 0.3);
}

.btn--secondary:hover {
    transform: translateY(-3px);
    background: linear-gradient(90deg,
            #32d6b3,
            var(--secondary-color));
    box-shadow: 0 10px 25px rgba(50, 214, 179, 0.5);
}

.btn--secondary:active {
    transform: translateY(1px);
}
</style>
