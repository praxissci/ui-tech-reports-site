/**
 * @license
 * Copyright (c) 2019 Rick Hansen Institute. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

export const template: string =
`
    <style>
        :host {
            display: block;
            margin: 0 auto;
            max-width: 1020px;
        }

        h1 {
            margin: 32px 16px 16px 16px;
        }

        h3 {
            border-bottom: solid 1px #CCC;
            margin: 32px 16px 0 16px;
            padding: 0 8px;
        }

        .project-list {
            flex-basis: 0;
            flex-grow: 1;
        }

        .project-lists {
            display: flex;
        }

        .projects {
            display: flex;
        }

        .projects .column {
            flex-basis: 0;
            flex-grow: 1;
        }

        .projects .column.left rhi-ui-tech-project-card {
            margin: 16px 8px 16px 16px;
        }

        .projects .column.right rhi-ui-tech-project-card {
            margin: 16px 16px 16px 8px;
        }

        rhi-ui-tech-project-card.rhi-cq {
            --rhi-ui-tech-project-card-media-background-color: #0CC;
            --rhi-ui-tech-project-card-media-background-image: url(\'images/cq-logo-2.png\');
        }

        @media only screen and (max-width: 720px) {
            .project-lists {
                display: block;
            }

            .projects {
                display: block;
            }

            .projects .column {
                width: auto;
            }

            .projects .column.left rhi-ui-tech-project-card,
            .projects .column.right rhi-ui-tech-project-card {
                margin: 16px;
            }
        }
    </style>
    <h1>IT Projects</h1>
    <div class="project-lists">
        <div id="active-project-list" class="project-list">
            <h3>Active</h3>
        </div>
        <div id="proposed-project-list" class="project-list">
            <h3>Proposed</h3>
        </div>
        <div id="stopped-project-list" class="project-list">
            <h3>Completed / Stopped</h3>
        </div>
    </div>
    <div id="active-projects"></div>
    <div id="proposed-projects"></div>
    <div id="stopped-projects"></div>
`;
