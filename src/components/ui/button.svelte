<script lang="ts">

 type keyboardProps = {
   title: string,
   aria: string,
   disabled: boolean,
   className: string
   onButtonPress: (event) => void
   onButtonRelease: (event) => void
   onMouseEnter: (event) => void
   onMouseLeave: (event) => void
 }

 let {
   onButtonPress,
   onButtonRelease,
   onMouseEnter,
   onMouseLeave,
   title,
   disabled = false,
   aria,
   className = ''
 } = $props<keyboardProps>()
</script>


<button
  class="button {className}"
  type="button"
  {disabled}
  {title}
  aria-label={aria}
  onclick={onButtonPress}
  onkeydown={onButtonPress}
  onkeyup={onButtonRelease}
  onmouseenter={onMouseEnter}
  onmouseleave={onMouseLeave}
>
  <slot></slot>
</button>

<style lang="scss">
  @use '../../styles/scss/mixins/motion' as motion;

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
    transition: box-shadow motion.$duration-moderate-long + ms motion.getMotion(standard, basic);
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
