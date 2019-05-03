/**
 * @license
 * Copyright (c) 2019 Rick Hansen Institute. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

export interface IProjectModel {
    champion: string;
    code: string;
    description: string;
    lead: string;
    leadInitials: string;
    milestones: Array<{
        description: string;
        date: string;
    }>;
    name: string;
    resources: Array<{
        name: string;
        url: string;
    }>;
    status: string;
    users: string[];
}

/* tslint:disable:max-line-length */
export const projectData: IProjectModel[] = [];
