import React from 'react';
import { shallow } from 'enzyme';
import { formatMessage } from '../../../../../../../../testUtils';
import { RandomizationCard } from './index';
import { useRandomizationSettingStatus } from './hooks';

jest.mock('./hooks', () => ({
  useRandomizationSettingStatus: jest.fn(),
}));

describe('RandomizationCard', () => {
  const props = {
    randomization: 'sOmE_vAlUE',
    updateSettings: jest.fn().mockName('args.updateSettings'),
    intl: { formatMessage },
  };

  const randomizationCardHooksProps = {
    summary: { message: { defaultMessage: 'sUmmary' } },
    handleChange: jest.fn().mockName('randomizationCardHooks.handleChange'),
  };

  useRandomizationSettingStatus.mockReturnValue(randomizationCardHooksProps);

  describe('behavior', () => {
    it(' calls useRandomizationSettingStatus when initialized', () => {
      shallow(<RandomizationCard {...props} />);
      expect(useRandomizationSettingStatus).toHaveBeenCalledWith(
        { updateSettings: props.updateSettings, randomization: props.randomization },
      );
    });
  });

  describe('snapshot', () => {
    test('snapshot: renders randonmization setting card with randomization defined', () => {
      expect(shallow(<RandomizationCard {...props} />)).toMatchSnapshot();
    });
    test('snapshot: renders randonmization setting card with randomization null', () => {
      expect(shallow(<RandomizationCard {...props} randomization={null} />)).toMatchSnapshot();
    });
  });
});
