'use client';

import {
    Input,
    Select,
    SelectItem,
    Textarea,
} from '@heroui/react';
import { format, subYears } from 'date-fns';
import { useFormContext } from 'react-hook-form';

export default function ProfileForm() {
    const {
        register,
        getValues,
        setValue,
        trigger,
        formState: { errors },
    } = useFormContext();

    const genderList = [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
    ];

    return (
        <div className="space-y-4">
            <Select
                defaultSelectedKeys={getValues('gender')}
                label="Gender"
                aria-label="Select gender"
                variant="bordered"
                {...register('gender')}
                isInvalid={!!errors.gender}
                errorMessage={
                    errors.gender?.message as string
                }
                // prettier-ignore
                onChange={e => setValue('gender', e.target.value, { shouldValidate: true,}) }
            >
                {genderList.map(item => (
                    <SelectItem key={item.value}>
                        {item.label}
                    </SelectItem>
                ))}
            </Select>
            <Input
                defaultValue=""
                label="Date of Birth"
                max={format(
                    subYears(new Date(), 18),
                    'yyyy-MM-dd',
                )}
                type="date"
                variant="bordered"
                {...register('dateOfBirth')}
                onBlur={() => trigger('dateOfBirth')}
                isInvalid={!!errors.dateOfBirth}
                errorMessage={
                    errors.dateOfBirth?.message as string
                }
            />
            <Textarea
                defaultValue=""
                label="Description"
                variant="bordered"
                {...register('description')}
                onBlur={() => trigger('description')}
                isInvalid={!!errors.description}
                errorMessage={
                    errors.description?.message as string
                }
            />
            <Input
                defaultValue=""
                label="City"
                variant="bordered"
                {...register('city')}
                onBlur={() => trigger('city')}
                isInvalid={!!errors.city}
                errorMessage={
                    errors.city?.message as string
                }
            />
            <Input
                defaultValue=""
                label="Country"
                variant="bordered"
                {...register('country')}
                onBlur={() => trigger('country')}
                isInvalid={!!errors.country}
                errorMessage={
                    errors.country?.message as string
                }
            />
        </div>
    );
}
