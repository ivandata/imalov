<script lang="ts">
  export let title: string;
  export let aria: string;
  export let disabled: boolean = false;

  export let onKeydown: (e: KeyboardEvent) => void = () => {};
  export let onKeyup: (e: KeyboardEvent) => void = () => {};
  export let onMousedown: (e: MouseEvent) => void = () => {};
  export let onMouseup: (e: MouseEvent) => void = () => {};
  export let onClick: (e: MouseEvent) => void = () => {};
</script>


<button
  class="button"
  type="button"
  {disabled}
  {title}
  aria-label={aria}
  on:keydown={onKeydown}
  on:keyup={onKeyup}
  on:mousedown={onMousedown}
  on:mouseup={onMouseup}
  on:click={onClick}
>
  <slot></slot>
</button>

<style>
  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    cursor: pointer;
    outline: none;
    border: var(--border-element-02) transparent;
    padding: var(--spacing-content-04);
    background-color: var(--color-background-invert-primary);
    color: var(--color-text-invert);
    fill: var(--color-text-invert);
    box-shadow: var(--box-shadow-01);
    line-height: var(--font-height-body);
    transition: box-shadow 0.3s ease-in-out;
  }

  .button svg {
      width: var(--font-body-size-m);
      height: var(--font-body-size-m);
  }

  .button:focus {
      border-color: var(--color-interactive-primary-focus);
  }

  .button:hover {
    box-shadow: var(--box-shadow-02);
  }
</style>
