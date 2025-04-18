import React, { useContext, useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import { useIntl, FormattedMessage } from '@edx/frontend-platform/i18n';
import { ensureConfig } from '@edx/frontend-platform';
import { AppContext } from '@edx/frontend-platform/react';
import {
  ActionRow,
  Button,
  Container,
  Hyperlink,
  Image,
  TransitionReplace,
} from '@openedx/paragon';
import { ExpandLess, ExpandMore, Help } from '@openedx/paragon/icons';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import messages from './messages';

ensureConfig([
  'LMS_BASE_URL',
  'MARKETING_SITE_BASE_URL',
  'TERMS_OF_SERVICE_URL',
  'PRIVACY_POLICY_URL',
  'SUPPORT_EMAIL',
  'SITE_NAME',
  'STUDIO_BASE_URL',
  'ENABLE_ACCESSIBILITY_PAGE',
], 'Studio Footer component');

const StudioFooter = ({
  containerProps,
}) => {
  const intl = useIntl();
  const [isOpen, setIsOpen] = useState(false);
  const { config } = useContext(AppContext);

  const { containerClassName, ...restContainerProps } = containerProps || {};

  return (
    <>
      <div className="m-0 mt-6 row align-items-center justify-content-center">
        <div className="col border-top mr-2" />
        <Button
          data-testid="helpToggleButton"
          variant="outline-primary"
          onClick={() => setIsOpen(!isOpen)}
          iconBefore={Help}
          iconAfter={isOpen ? ExpandLess : ExpandMore}
          size="sm"
        >
          {isOpen ? intl.formatMessage(messages.closeHelpButtonLabel)
            : intl.formatMessage(messages.openHelpButtonLabel)}
        </Button>
        <div className="col border-top ml-2" />
      </div>
      <Container
        size="xl"
        className={classNames('px-4', containerClassName)}
        {...restContainerProps}
      >
        <TransitionReplace>
          {isOpen ? (
            <ActionRow key="help-link-button-row" className="py-4" data-testid="helpButtonRow">
              <ActionRow.Spacer />
              <Button as="a" href="https://docs.edx.org/" size="sm">
                <FormattedMessage {...messages.edxDocumentationButtonLabel} />
              </Button>
              <Button
                as="a"
                href="https://open.edx.org/"
                size="sm"
                data-testid="openEdXPortalButton"
              >
                <FormattedMessage {...messages.openEdxPortalButtonLabel} />
              </Button>
              <Button
                as="a"
                href="https://www.edx.org/course/edx101-overview-of-creating-an-edx-course#.VO4eaLPF-n1"
                size="sm"
              >
                <FormattedMessage {...messages.edx101ButtonLabel} />
              </Button>
              <Button
                as="a"
                href="https://www.edx.org/course/studiox-creating-a-course-with-edx-studio"
                size="sm"
              >
                <FormattedMessage {...messages.studioXButtonLabel} />
              </Button>
              {!isEmpty(config.SUPPORT_EMAIL) && (
                <Button
                  as="a"
                  href={`mailto:${config.SUPPORT_EMAIL}`}
                  size="sm"
                  data-testid="contactUsButton"
                >
                  <FormattedMessage {...messages.contactUsButtonLabel} />
                </Button>
              )}
              <ActionRow.Spacer />
            </ActionRow>
          ) : null}
        </TransitionReplace>
        <ActionRow className="pt-3 m-0 x-small">
          © {new Date().getFullYear()} <Hyperlink destination={config.MARKETING_SITE_BASE_URL} target="_blank" className="ml-2">{config.SITE_NAME}</Hyperlink>
          <ActionRow.Spacer />
          {!isEmpty(config.TERMS_OF_SERVICE_URL) && (
            <Hyperlink destination={config.TERMS_OF_SERVICE_URL} data-testid="termsOfService">
              {intl.formatMessage(messages.termsOfServiceLinkLabel)}
            </Hyperlink>
          )}{!isEmpty(config.PRIVACY_POLICY_URL) && (
            <Hyperlink destination={config.PRIVACY_POLICY_URL} data-testid="privacyPolicy">
              {intl.formatMessage(messages.privacyPolicyLinkLabel)}
            </Hyperlink>
          )}
          {config.ENABLE_ACCESSIBILITY_PAGE === 'true' && (
            <Hyperlink
              destination={`${config.STUDIO_BASE_URL}/accessibility`}
              data-testid="accessibilityRequest"
            >
              {intl.formatMessage(messages.accessibilityRequestLinkLabel)}
            </Hyperlink>
          )}
          <Hyperlink destination={config.LMS_BASE_URL}>LMS</Hyperlink>
        </ActionRow>
        <ActionRow className="mt-3 pb-4 x-small">
          {/*
            Site operators: Please do not remove this paragraph! this attributes back to edX and
              makes your acknowledgement of edX's trademarks clear.
            Translators: 'edX' and 'Open edX' are trademarks of 'edX Inc.'. Please do not translate
              any of these trademarks and company names.
          */}
          <FormattedMessage {...messages.trademarkMessage} />
          <Hyperlink className="ml-1" destination="https://www.edx.org">edX Inc</Hyperlink>.
          <ActionRow.Spacer />
          <Hyperlink destination="https://open.edx.org" className="float-right">
            <Image
              width="120px"
              alt="Powered by Open edX"
              src="https://logos.openedx.org/open-edx-logo-tag.png"
            />
          </Hyperlink>
        </ActionRow>
      </Container>
    </>
  );
};

StudioFooter.propTypes = {
  containerProps: PropTypes.shape(Container.propTypes),
};

StudioFooter.defaultProps = {
  containerProps: {},
};

export default StudioFooter;
