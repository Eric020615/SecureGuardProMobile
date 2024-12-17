import React from 'react';
import { View } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import CustomFloatingButton from '@components/buttons/CustomFloatingButton'; // Adjust the path as necessary

describe('CustomFloatingButton Component', () => {
    const defaultProps = {
        handlePress: jest.fn(),
        testId: 'custom-floating-button',
    };

    // Helper function for rendering
    const setup = (props = {}) => {
        const combinedProps = { ...defaultProps, ...props };
        const utils = render(<CustomFloatingButton {...combinedProps} />);
        return { ...utils, props: combinedProps };
    };

    // Clear mocks before each test
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders without crashing', () => {
        const { getByTestId } = setup();
        expect(getByTestId(defaultProps.testId)).toBeTruthy();
    });

    it('calls handlePress when TouchableOpacity is pressed', () => {
        const { getByTestId, props } = setup();
        fireEvent.press(getByTestId(props.testId));
        expect(props.handlePress).toHaveBeenCalledTimes(1);
    });

    it('renders reactNativeIcons when provided', () => {
        const testIcon = <View testID="test-icon" />;
        const { getByTestId } = setup({ reactNativeIcons: testIcon });
        expect(getByTestId('test-icon')).toBeTruthy();
    });

    it('does not throw with minimal props', () => {
        expect(() => setup()).not.toThrow();
    });

    it('handles missing optional properties gracefully', () => {
        const { getByTestId } = setup();
        expect(getByTestId(defaultProps.testId).props.className).toBeUndefined();
    });
});
