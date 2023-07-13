import { html, nothing, TemplateResult } from 'lit'

import { EHorizonCardI18NKeys, IHorizonCardConfig, THorizonCardData, THorizonCardFields, TSunTimes } from '../../types'
import { HelperFunctions } from '../../utils/HelperFunctions'
import { I18N } from '../../utils/I18N'

export class HorizonCardHeader {
  private readonly title?: string
  private readonly times: TSunTimes
  private readonly fields: THorizonCardFields
  private readonly i18n: I18N

  constructor (config: IHorizonCardConfig, data: THorizonCardData, i18n: I18N) {
    this.title = config.title
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.fields = config.fields!
    this.times = data.sunData.times
    this.i18n = i18n
  }

  public render (): TemplateResult {
    return html`
      ${ this.showTitle() ? this.renderTitle() : nothing }
      ${ this.renderHeader() }
    `
  }

  private renderTitle (): TemplateResult {
    return html`<div class="horizon-card-title">${ this.title }</div>`
  }

  private renderHeader (): TemplateResult {
    return html`
      <div class="horizon-card-header">
        ${
          this.fields.sunrise
            ? HelperFunctions.renderFieldElement(this.i18n, EHorizonCardI18NKeys.Sunrise, this.times.sunrise)
            : nothing
        }
        ${
          this.fields.sunset
            ? HelperFunctions.renderFieldElement(this.i18n, EHorizonCardI18NKeys.Sunset, this.times.sunset)
            : nothing
        }
      </div>
    `
  }

  private showTitle (): boolean {
    return this.title !== undefined
  }
}
