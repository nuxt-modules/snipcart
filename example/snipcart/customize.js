module.exports = `
<item-line>
      <li class="bg-red snipcart__item__line snipcart__box">
          <div class="snipcart__item__line__product">
              <div class="snipcart__item__line__header">
                  <h2 class="snipcart__item__line__header__title">
                      {{ item.name }}
                  </h2>

                  <item-quantity class="snipcart__item__line__quantity" v-if="!adding"></item-quantity>
                  <div class="snipcart__item__line__header__actions">
                      <remove-item-action class="snipcart__button--icon">
                          <icon name="trash" class="icon--red"  alt="item.remove_item"></icon>
                      </remove-item-action>
                  </div>
              </div>
          </div>
      </li>
</item-line>
`
