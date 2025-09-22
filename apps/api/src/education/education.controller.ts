import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { EducationService } from './education.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Education')
@Controller('api/education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Get('courses')
  @ApiOperation({ summary: 'Get all available courses' })
  @ApiResponse({ status: 200, description: 'Courses retrieved successfully' })
  async getCourses(
    @Query('category') category?: string,
    @Query('level') level?: string,
    @Query('isFree') isFree?: string,
  ) {
    return this.educationService.getCourses({ category, level, isFree: isFree === 'true' });
  }

  @Get('courses/:id')
  @ApiOperation({ summary: 'Get course details' })
  @ApiResponse({ status: 200, description: 'Course details retrieved' })
  @ApiResponse({ status: 404, description: 'Course not found' })
  async getCourse(@Param('id', ParseUUIDPipe) id: string) {
    return this.educationService.getCourse(id);
  }

  @Post('courses/:id/enroll')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Enroll in a course' })
  @ApiResponse({ status: 201, description: 'Successfully enrolled in course' })
  @ApiResponse({ status: 400, description: 'Already enrolled or course not available' })
  async enrollInCourse(@Param('id', ParseUUIDPipe) id: string, @Request() req) {
    return this.educationService.enrollInCourse(id, req.user.id);
  }

  @Get('my-courses')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user enrolled courses' })
  @ApiResponse({ status: 200, description: 'Enrolled courses retrieved' })
  async getMyCourses(@Request() req) {
    return this.educationService.getUserCourses(req.user.id);
  }

  @Get('courses/:courseId/modules/:moduleId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get course module content' })
  @ApiResponse({ status: 200, description: 'Module content retrieved' })
  async getModuleContent(
    @Param('courseId', ParseUUIDPipe) courseId: string,
    @Param('moduleId', ParseUUIDPipe) moduleId: string,
    @Request() req,
  ) {
    return this.educationService.getModuleContent(courseId, moduleId, req.user.id);
  }

  @Post('progress')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update course progress' })
  @ApiResponse({ status: 200, description: 'Progress updated successfully' })
  async updateProgress(
    @Body() progressData: {
      courseId: string;
      moduleId?: string;
      completed: boolean;
      score?: number;
      timeSpent: number;
    },
    @Request() req,
  ) {
    return this.educationService.updateProgress(progressData, req.user.id);
  }

  @Get('reco-resources')
  @ApiOperation({ summary: 'Get RECO resources and materials' })
  @ApiResponse({ status: 200, description: 'RECO resources retrieved' })
  async getRecoResources(@Query('category') category?: string) {
    return this.educationService.getRecoResources(category);
  }

  @Get('self-representation-guide')
  @ApiOperation({ summary: 'Get self-representation guides' })
  @ApiResponse({ status: 200, description: 'Self-representation guides retrieved' })
  async getSelfRepresentationGuides(@Query('category') category?: string) {
    return this.educationService.getSelfRepresentationGuides(category);
  }

  @Get('licensing-requirements')
  @ApiOperation({ summary: 'Get RECO licensing requirements' })
  @ApiResponse({ status: 200, description: 'Licensing requirements retrieved' })
  async getLicensingRequirements() {
    return this.educationService.getLicensingRequirements();
  }

  @Get('continuing-education')
  @ApiOperation({ summary: 'Get continuing education requirements' })
  @ApiResponse({ status: 200, description: 'Continuing education info retrieved' })
  async getContinuingEducation() {
    return this.educationService.getContinuingEducation();
  }

  @Get('my-progress')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user education progress summary' })
  @ApiResponse({ status: 200, description: 'Progress summary retrieved' })
  async getMyProgress(@Request() req) {
    return this.educationService.getUserProgressSummary(req.user.id);
  }
}
