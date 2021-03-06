package com.mobile;

import android.app.Activity;
import android.content.Intent;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;

import com.facebook.react.bridge.WritableMap;
import com.stripe.android.ApiResultCallback;
import com.stripe.android.PaymentConfiguration;
// import com.stripe.android.PaymentIntentResult;
import com.stripe.android.SetupIntentResult;
import com.stripe.android.Stripe;
import com.stripe.android.model.Card;
import com.stripe.android.model.PaymentMethodCreateParams;
// import com.stripe.android.model.ConfirmPaymentIntentParams;
import com.stripe.android.model.ConfirmSetupIntentParams;
// import com.stripe.android.model.PaymentIntent;
import com.stripe.android.model.SetupIntent;

public class StripeBridgeModule extends ReactContextBaseJavaModule {

    private static ReactApplicationContext reactContext;

    private Stripe stripe;
    private Promise paymentPromise;

    private final ActivityEventListener activityListener = new BaseActivityEventListener() {

        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
            if (paymentPromise == null || stripe == null) {
                super.onActivityResult(activity, requestCode, resultCode, data);
                return;
            }
            boolean handled = stripe.onSetupResult(requestCode, data, new SetupResultCallback(paymentPromise));
            if (!handled) {
                super.onActivityResult(activity, requestCode, resultCode, data);
            }
            // boolean handledP = stripe.onPaymentResult(requestCode, data, new PaymentResultCallback(paymentPromise));
            // if (!handledP) {
            //     super.onActivityResult(activity, requestCode, resultCode, data);
            // }
        }
    };

    StripeBridgeModule(ReactApplicationContext context) {
        super(context);

        context.addActivityEventListener(activityListener);

        reactContext = context;
    }

    @Override
    public String getName() {
        return "StripeBridge";
    }

    @ReactMethod(isBlockingSynchronousMethod =  true)
    public boolean isCardValid(ReadableMap cardParams) {
        Card card =  new Card.Builder(
                    cardParams.getString("number"),
                    cardParams.getInt("expMonth"),
                    cardParams.getInt("expYear"),
                    cardParams.getString("cvc")
                )
                .build();
        return card.validateNumber() && card.validateExpiryDate() && card.validateExpMonth() && card.validateCVC();
    }

    // @ReactMethod
    // public void confirmPaymentIntent(String secret, ReadableMap cardParams, final Promise promise) {
    //     PaymentMethodCreateParams.Card card = new PaymentMethodCreateParams.Card(
    //             cardParams.getString("number"),
    //             cardParams.getInt("expMonth"),
    //             cardParams.getInt("expYear"),
    //             cardParams.getString("cvc"),
    //             null,
    //             null
    //     );
    //     PaymentMethodCreateParams params = PaymentMethodCreateParams.create(card);
    //     ConfirmPaymentIntentParams confirmParams = ConfirmPaymentIntentParams.createWithPaymentMethodCreateParams(params, secret);
    //     if (params == null) {
    //         promise.reject("", "StripeModule.invalidPaymentIntentParams");
    //         return;
    //     }

    //     paymentPromise = promise;
    //     stripe = new Stripe(
    //             reactContext,
    //             PaymentConfiguration.getInstance(reactContext).getPublishableKey()
    //     );
    //     stripe.confirmPayment(getCurrentActivity(), confirmParams);
    // }

    @ReactMethod
    public void confirmSetupIntend(String secret, ReadableMap cardParams, final Promise promise) {
        PaymentMethodCreateParams.Card card = new PaymentMethodCreateParams.Card(
                cardParams.getString("number"),
                cardParams.getInt("expMonth"),
                cardParams.getInt("expYear"),
                cardParams.getString("cvc"),
                null,
                null
        );
        PaymentMethodCreateParams params = PaymentMethodCreateParams.create(card);
        ConfirmSetupIntentParams confirmParams = ConfirmSetupIntentParams.create(params, secret);
        // ConfirmSetupIntentParams confirmParams = ConfirmSetupIntentParams.createWithPaymentMethodCreateParams(params, secret);
        if (params == null) {
            promise.reject("", "StripeModule.invalidPaymentIntentParams");
            return;
        }

        paymentPromise = promise;
        stripe = new Stripe(
                reactContext,
                PaymentConfiguration.getInstance(reactContext).getPublishableKey()
        );
        stripe.confirmSetupIntent(getCurrentActivity(), confirmParams);
    }

    private static final class SetupResultCallback implements ApiResultCallback<SetupIntentResult> {
        private final Promise promise;

        SetupResultCallback(Promise promise) {
            this.promise = promise;
        }

        @Override
        public void onSuccess(SetupIntentResult result) {
            SetupIntent setupIntent = result.getIntent();
            SetupIntent.Status status = setupIntent.getStatus();
            if (status == SetupIntent.Status.Succeeded) {
                WritableMap map = Arguments.createMap();
                map.putString("status", "Succeeded");
                // map.putString("id", setupIntent.getId());
                // map.putString("paymentMethodId", setupIntent.getPaymentMethodId());
                promise.resolve(map);
            } 
            else {
                promise.reject("StripeModule.failed", status.toString());
            }
        }

        @Override
        public void onError(Exception e) {
            promise.reject("StripeModule.failed", e.toString());
        }
    }


    // private static final class PaymentResultCallback implements ApiResultCallback<PaymentIntentResult> {
    //     private final Promise promise;

    //     PaymentResultCallback(Promise promise) {
    //         this.promise = promise;
    //     }

    //     @Override
    //     public void onSuccess(PaymentIntentResult result) {
    //         PaymentIntent paymentIntent = result.getIntent();
    //         PaymentIntent.Status status = paymentIntent.getStatus();

    //         if (
    //                 status == PaymentIntent.Status.Succeeded ||
    //                 status == PaymentIntent.Status.Processing
    //         ) {
    //             WritableMap map = Arguments.createMap();
    //             map.putString("id", paymentIntent.getId());
    //             map.putString("paymentMethodId", paymentIntent.getPaymentMethodId());
    //             promise.resolve(map);
    //         } else if (status == PaymentIntent.Status.Canceled) {
    //             promise.reject("StripeModule.cancelled", "");
    //         } else {
    //             promise.reject("StripeModule.failed", status.toString());
    //         }
    //     }

    //     @Override
    //     public void onError(Exception e) {
    //         promise.reject("StripeModule.failed", e.toString());
    //     }
    // }
}