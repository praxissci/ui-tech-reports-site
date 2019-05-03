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

import '@rhi-ui/tech-project-card';
import { IProjectModel, projectData } from '../@rhi-data/rhi-data-tech-projects';
import { template as _template } from './rhi-ui-tech-projects-template';

interface IProjectGroups {
    active: IProjectModel[];
    proposed: IProjectModel[];
    stopped: IProjectModel[];
}

export class RhiUiTechProjects extends HTMLElement {
    public static get is() { return 'rhi-ui-tech-projects'; }

    private static groupProjectsByStatus(projects: IProjectModel[]): IProjectGroups {
        const projectGroups: IProjectGroups = {
            active: [],
            proposed: [],
            stopped: [],
        };

        projects.forEach(
            (project: IProjectModel) => {
                'maintenance' === project.status
                || 'pre-production' === project.status
                || 'development' === project.status
                ? projectGroups.active.push(project)
                : 'proposed' === project.status
                    ? projectGroups.proposed.push(project)
                    : projectGroups.stopped.push(project);
            }
        );

        return projectGroups;
    }

    private static getProjectCardElementFrom(
        champion: string,
        code: string,
        description: string,
        lead: string,
        leadInitials: string,
        milestones: string,
        name: string,
        resources: string,
        status: string,
    ): HTMLElement {
        const projectCard: HTMLElement = document.createElement('RHI-UI-TECH-PROJECT-CARD');
        projectCard.setAttribute('champion', champion);
        projectCard.setAttribute('code', code);
        projectCard.setAttribute('description', description);
        projectCard.setAttribute('elevation', '1');
        projectCard.setAttribute('lead', lead);
        projectCard.setAttribute('lead-initials', leadInitials);
        projectCard.setAttribute('milestones', milestones);
        projectCard.setAttribute('name', name);
        projectCard.setAttribute('resources', resources);
        projectCard.setAttribute('status', status);
        projectCard.classList.add(code);

        return projectCard;
    }

    private static getProjectElements(groupName: string, projects: IProjectModel[]): {
        list: HTMLElement;
        columns: HTMLElement;
        subHeader: HTMLElement;
    } {
        const subHeader: HTMLElement = document.createElement('H3');
        const list: HTMLElement = document.createElement('OL');
        const columns: HTMLElement = document.createElement('DIV');
        const leftColumn: HTMLElement = document.createElement('DIV');
        const rightColumn: HTMLElement = document.createElement('DIV');

        columns.appendChild(leftColumn);
        columns.appendChild(rightColumn);
        columns.classList.add('projects');
        leftColumn.classList.add('column');
        leftColumn.classList.add('left');
        rightColumn.classList.add('column');
        rightColumn.classList.add('right');
        subHeader.innerText = `${groupName} (${projects.length})`;

        projects.forEach(
            (project: IProjectModel) => {
                const projectCard: HTMLElement = RhiUiTechProjects.getProjectCardElementFrom(
                    project.champion,
                    project.code,
                    project.description,
                    project.lead,
                    project.leadInitials,
                    '[]',
                    project.name,
                    '[]',
                    project.status
                );

                leftColumn.childElementCount === rightColumn.childElementCount
                ? leftColumn.appendChild(projectCard)
                : rightColumn.appendChild(projectCard);

                const listItem: HTMLElement = document.createElement('LI');
                listItem.innerText = project.name;
                list.appendChild(listItem);
            }
        );

        return { list, columns, subHeader };
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.requestRender(this.getTemplate());
        this.updateProjects();
    }

    public getTemplate(): string {
        return _template;
    }

    private requestRender(template: string): void {
        const newTemplate = document.createElement('template');
        newTemplate.innerHTML = template;
        this.shadowRoot!.appendChild(newTemplate.content.cloneNode(true));
    }

    private updateProjects() {
        const projectGroups: IProjectGroups = RhiUiTechProjects.groupProjectsByStatus(projectData);
        const activeProjectList: (HTMLElement | null) = this.shadowRoot!.querySelector('#active-project-list');
        const activeProjects: (HTMLElement | null) = this.shadowRoot!.querySelector('#active-projects');
        const proposedProjectList: (HTMLElement | null) = this.shadowRoot!.querySelector('#proposed-project-list');
        const proposedProjects: (HTMLElement | null) = this.shadowRoot!.querySelector('#proposed-projects');
        const stoppedProjectList: (HTMLElement | null) = this.shadowRoot!.querySelector('#stopped-project-list');
        const stoppedProjects: (HTMLElement | null) = this.shadowRoot!.querySelector('#stopped-projects');

        if (activeProjects && activeProjectList) {
            const activeElements: {
                list: HTMLElement;
                columns: HTMLElement;
                subHeader: HTMLElement;
            } = RhiUiTechProjects.getProjectElements('Active', projectGroups.active);
            activeProjectList.appendChild(activeElements.list);
            activeProjects.appendChild(activeElements.subHeader);
            activeProjects.appendChild(activeElements.columns);
        }

        if (proposedProjects && proposedProjectList) {
            const proposedElements: {
                list: HTMLElement;
                columns: HTMLElement;
                subHeader: HTMLElement;
            } = RhiUiTechProjects.getProjectElements('Proposed', projectGroups.proposed);
            proposedProjectList.appendChild(proposedElements.list);
            proposedProjects.appendChild(proposedElements.subHeader);
            proposedProjects.appendChild(proposedElements.columns);
        }

        if (stoppedProjects && stoppedProjectList) {
            const stoppedElements: {
                list: HTMLElement;
                columns: HTMLElement;
                subHeader: HTMLElement;
            } = RhiUiTechProjects.getProjectElements('Completed / Stopped', projectGroups.stopped);
            stoppedProjectList.appendChild(stoppedElements.list);
            stoppedProjects.appendChild(stoppedElements.subHeader);
            stoppedProjects.appendChild(stoppedElements.columns);
        }
    }
}

window.customElements.define(RhiUiTechProjects.is, RhiUiTechProjects);
