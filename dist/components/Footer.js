import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { ensureConfig } from '@edx/frontend-platform/config';
import { AppContext } from '@edx/frontend-platform/react';
import messages from './Footer.messages';
import LanguageSelector from './LanguageSelector';
ensureConfig(['LMS_BASE_URL', 'LOGO_TRADEMARK_URL'], 'Footer component');
const EVENT_NAMES = {
  FOOTER_LINK: 'edx.bi.footer.link'
};
class SiteFooter extends React.Component {
  constructor(props) {
    super(props);
    this.externalLinkClickHandler = this.externalLinkClickHandler.bind(this);
  }
  externalLinkClickHandler(event) {
    const label = event.currentTarget.getAttribute('href');
    const eventName = EVENT_NAMES.FOOTER_LINK;
    const properties = {
      category: 'outbound_link',
      label
    };
    sendTrackEvent(eventName, properties);
  }
  render() {
    const {
      supportedLanguages,
      onLanguageSelected,
      logo,
      intl
    } = this.props;
    const showLanguageSelector = supportedLanguages.length > 0 && onLanguageSelected;
    const {
      config
    } = this.context;
    return /*#__PURE__*/React.createElement("footer", {
      role: "contentinfo",
      className: "footer d-flex border-top py-3 px-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "container-fluid d-flex"
    }, /*#__PURE__*/React.createElement("a", {
      className: "d-block",
      href: config.LMS_BASE_URL,
      "aria-label": intl.formatMessage(messages['footer.logo.ariaLabel'])
    }, /*#__PURE__*/React.createElement("img", {
      style: {
        maxHeight: 45
      },
      src: logo || "https://raw.githubusercontent.com/PabloSGomez50/frontend-app-authn/my_palm/src/sass/logo_dark.svg",
      alt: intl.formatMessage(messages['footer.logo.altText'])
    })), /*#__PURE__*/React.createElement("div", {
      className: "flex-grow-1"
    }), /*#__PURE__*/React.createElement("span", null, "Este es un mensaje personalizado del footer"), /*#__PURE__*/React.createElement("p", null, "logo_dark.svg"), /*#__PURE__*/React.createElement("img", {
      src: "https://raw.githubusercontent.com/PabloSGomez50/frontend-app-authn/my_palm/src/sass/logo_dark.svg"
    }), showLanguageSelector && /*#__PURE__*/React.createElement(LanguageSelector, {
      options: supportedLanguages,
      onSubmit: onLanguageSelected
    })));
  }
}
SiteFooter.contextType = AppContext;
SiteFooter.propTypes = {
  intl: intlShape.isRequired,
  logo: PropTypes.string,
  onLanguageSelected: PropTypes.func,
  supportedLanguages: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  }))
};
SiteFooter.defaultProps = {
  logo: undefined,
  onLanguageSelected: undefined,
  supportedLanguages: []
};
export default injectIntl(SiteFooter);
export { EVENT_NAMES };
//# sourceMappingURL=Footer.js.map