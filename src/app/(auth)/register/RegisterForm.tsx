'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
// prettier-ignore
import { profileSchema,registerSchema, RegisterSchema,} from '@/lib/schemas/registerSchema';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { GiPadlock } from 'react-icons/gi';
import { Button } from '@heroui/button';
import { registerUser } from '@/app/actions/authActions';
import { handleFormServerErrors } from '@/lib/util';
import UserDetailsForm from './UserDetailsForm';
import { useState } from 'react';
import ProfileForm from './ProfileForm';
import { useRouter } from 'next/navigation';
import { ZodSchema } from 'zod';

const stepSchemas = [registerSchema, profileSchema];

export default function RegisterForm() {
    const router = useRouter();
    const [activeStep, setActiveStep] = useState(0);
    const currentValidationSchema = stepSchemas[activeStep];

    const methods = useForm<RegisterSchema>({
        resolver: zodResolver(
            currentValidationSchema as ZodSchema,
        ),
        mode: 'onTouched',
    });

    const {
        handleSubmit,
        setError,
        getValues,
        formState: { errors, isSubmitting, isValid },
    } = methods;

    const onSubmit = async () => {
        const result = await registerUser(getValues());

        if (result.status === 'success') {
            router.push('/register/success');
        } else {
            handleFormServerErrors(result, setError);
        }
    };

    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return <UserDetailsForm />;
            case 1:
                return <ProfileForm />;
            default:
                return 'Unknown step';
        }
    };

    const onBack = () => {
        setActiveStep(prev => prev - 1);
    };

    const onNext = async () => {
        if (activeStep === stepSchemas.length - 1) {
            await onSubmit();
        } else {
            setActiveStep(prev => prev + 1);
        }
    };

    return (
        <Card className="w-2/5 mx-auto">
            <CardHeader className="flex flex-col items-center justify-center">
                <div className="flex flex-col gap-2 items-center text-secondary">
                    <div className="flex flex-row gap-3 items-center">
                        <GiPadlock size={30} />
                        <h1 className="text-3xl font-semibold">
                            Register
                        </h1>
                    </div>
                    <p className="text-neutral-500">
                        Welcome to NextMatch
                    </p>
                </div>
            </CardHeader>
            <CardBody>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onNext)}>
                        <div className="space-y-4">
                            {getStepContent(activeStep)}

                            {errors.root?.serverError && (
                                <p className="text-danger text-sm">
                                    {
                                        errors.root
                                            .serverError
                                            .message
                                    }
                                </p>
                            )}
                            <div className="flex flex-grow items-center gap-6">
                                {activeStep !== 0 && (
                                    <Button
                                        onPress={onBack}
                                        fullWidth
                                    >
                                        Back
                                    </Button>
                                )}
                                <Button
                                    isLoading={isSubmitting}
                                    isDisabled={!isValid}
                                    fullWidth
                                    color="secondary"
                                    type="submit"
                                >
                                    {activeStep ===
                                    stepSchemas.length - 1
                                        ? 'Submit'
                                        : 'Continue'}
                                </Button>
                            </div>
                        </div>
                    </form>
                </FormProvider>
            </CardBody>
        </Card>
    );
}
