# Multi-Tenant Event Platform

An event and guest management application built around isolated tenant workspaces.

## Application scope

The application combines event and guest data with tenant management. Its React interface communicates with Laravel through Inertia.

## Architecture

- Laravel Octane and FrankenPHP handle the application runtime.
- PostgreSQL stores application data, with separate databases for individual tenants.
- A central database manages tenants, global users, roles and permissions.
- Subdomain resolution selects the tenant context for an incoming request.
- Redis supports caching, sessions and queued work.

## Tenant provisioning

Tenant creation includes database creation, migrations and initial role/menu setup. This connects the administrative workflow to the data isolation strategy.

## Engineering focus

The central challenge is keeping tenant context consistent across requests and application workflows. Separating shared administration from tenant-owned event data makes that boundary explicit.

## Project access

This is a private project. This overview describes the technology and application structure; source code, deployment configuration and operational data are not included.

[Discuss a similar project](mailto:fantocaa17@gmail.com)
